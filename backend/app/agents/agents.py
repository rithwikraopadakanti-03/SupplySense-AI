"""
SupplySense AI Agent Architecture
7 specialized agents using LangGraph pattern
Gracefully degrades to mock responses when Gemini API key not configured
"""
from typing import TypedDict, List, Optional, Dict, Any
from datetime import datetime
import json
import random

from app.core.config import settings
from app.services.mock_data import (
    SUPPLIERS, INVENTORY, SHIPMENTS, RISK_EVENTS,
    get_copilot_response, PROCUREMENT_RECOMMENDATIONS
)


# ─── STATE DEFINITIONS ────────────────────────────────────────────────────────
class AgentState(TypedDict):
    query: str
    context: Dict[str, Any]
    analysis: str
    recommendations: List[str]
    confidence: float
    agent_name: str


class AgentResult(TypedDict):
    agent: str
    goal: str
    analysis: str
    recommendations: List[str]
    risk_score: Optional[float]
    confidence: float
    timestamp: str
    metadata: Dict[str, Any]


# ─── BASE AGENT ───────────────────────────────────────────────────────────────
class BaseSupplySenseAgent:
    """Base class for all SupplySense AI agents"""

    def __init__(self, name: str, goal: str, tools: List[str]):
        self.name = name
        self.goal = goal
        self.tools = tools
        self.memory: List[Dict] = []
        self.use_real_ai = not settings.USE_MOCK_AI

    def _add_to_memory(self, entry: Dict):
        self.memory.append({**entry, "timestamp": datetime.now().isoformat()})
        if len(self.memory) > 100:
            self.memory = self.memory[-50:]

    async def _call_gemini(self, prompt: str) -> str:
        """Call Gemini API if key is configured, otherwise use mock"""
        if self.use_real_ai and settings.GEMINI_API_KEY:
            try:
                from langchain_google_genai import ChatGoogleGenerativeAI
                llm = ChatGoogleGenerativeAI(
                    model="gemini-2.0-flash",
                    google_api_key=settings.GEMINI_API_KEY,
                    temperature=0.3,
                )
                response = await llm.ainvoke(prompt)
                return response.content
            except Exception as e:
                print(f"Gemini API error: {e}, falling back to mock")
        return self._mock_response(prompt)

    def _mock_response(self, prompt: str) -> str:
        """Override in subclasses for agent-specific mock responses"""
        return f"Mock analysis from {self.name}: Analysis complete based on current supply chain data."

    def _build_result(self, analysis: str, recommendations: List[str], risk_score: Optional[float] = None, confidence: float = 0.89, metadata: Dict = {}) -> AgentResult:
        result: AgentResult = {
            "agent": self.name,
            "goal": self.goal,
            "analysis": analysis,
            "recommendations": recommendations,
            "risk_score": risk_score,
            "confidence": confidence,
            "timestamp": datetime.now().isoformat(),
            "metadata": metadata,
        }
        self._add_to_memory({"type": "output", "result": result})
        return result


# ─── INVENTORY AGENT ─────────────────────────────────────────────────────────
class InventoryAgent(BaseSupplySenseAgent):
    """
    Goal: Monitor inventory levels, predict stockouts, optimize reorder points
    Memory: Historical stock levels, reorder history, seasonal patterns
    Tools: inventory_query, demand_forecast, reorder_calculator, warehouse_transfer
    """

    def __init__(self):
        super().__init__(
            name="InventoryAgent",
            goal="Prevent stockouts and overstock by maintaining optimal inventory levels across all warehouses",
            tools=["inventory_query", "demand_forecast", "reorder_calculator", "warehouse_transfer"],
        )

    def _mock_response(self, prompt: str) -> str:
        critical_items = [i for i in INVENTORY if i["ai_action"] == "ORDER NOW"]
        transfer_items = [i for i in INVENTORY if i["ai_action"] == "TRANSFER"]

        product_names = {1: "iPhone 15 Pro", 3: "AirPods Pro 4", 7: "RTX 4090", 11: "RTX 4090"}
        critical_str = ", ".join([product_names.get(i["product_id"], f"Product {i['product_id']}") for i in critical_items[:3]])

        return (
            f"Inventory analysis complete. {len(critical_items)} SKUs require immediate reordering: {critical_str}. "
            f"{len(transfer_items)} SKUs need warehouse transfers to balance stock. "
            f"Total inventory value at risk from stockouts: $4.2M. "
            f"Recommended safety stock adjustments for {len(INVENTORY)} tracked items."
        )

    async def analyze(self) -> AgentResult:
        prompt = f"""
        Analyze current inventory data:
        - Total SKUs: {len(INVENTORY)}
        - Critical items (ORDER NOW): {len([i for i in INVENTORY if i['ai_action'] == 'ORDER NOW'])}
        - Transfer needed: {len([i for i in INVENTORY if i['ai_action'] == 'TRANSFER'])}
        - Lowest days remaining: {min(i['days_remaining'] for i in INVENTORY):.1f}

        Provide inventory health assessment, stockout risk, and top 5 recommendations.
        """
        analysis = await self._call_gemini(prompt)

        return self._build_result(
            analysis=analysis,
            recommendations=[
                "Emergency reorder: iPhone 15 Pro (500 units) - 5.8 days remaining",
                "Emergency reorder: AirPods Pro 4 (350 units) - 4.1 days remaining",
                "Emergency reorder: RTX 4090 (200 units) - 3.2 days remaining",
                "Transfer 120 units PS5 from WH-Delta to WH-Gamma",
                "Increase safety stock thresholds for electronics category by 15%",
            ],
            risk_score=72.5,
            confidence=0.94,
            metadata={"critical_skus": 3, "transfer_needed": 2, "total_value_at_risk": 4200000},
        )


# ─── SUPPLIER AGENT ───────────────────────────────────────────────────────────
class SupplierAgent(BaseSupplySenseAgent):
    """
    Goal: Monitor supplier performance, predict failures, recommend sourcing changes
    Memory: Supplier score history, incident log, contract terms
    Tools: supplier_score_query, delivery_history, risk_scorer, alternative_finder
    """

    def __init__(self):
        super().__init__(
            name="SupplierAgent",
            goal="Maintain optimal supplier network by identifying risks, ranking performance, and ensuring supply continuity",
            tools=["supplier_score_query", "delivery_history", "risk_scorer", "alternative_finder"],
        )

    def _mock_response(self, prompt: str) -> str:
        at_risk = [s for s in SUPPLIERS if s["risk_score"] > 60]
        top_performer = max(SUPPLIERS, key=lambda s: s["reliability_score"])
        return (
            f"Supplier analysis complete. {len(at_risk)} suppliers classified as high risk. "
            f"Top performer: {top_performer['name']} (reliability: {top_performer['reliability_score']}%). "
            f"Shanghai TechParts Ltd. risk score at 78.5/100 — recommend reducing order allocation by 40%. "
            f"Two German suppliers (GlobalParts Inc., EuroComp GmbH) showing excellent performance for diversification."
        )

    async def analyze(self) -> AgentResult:
        high_risk = [s for s in SUPPLIERS if s["risk_score"] > 50]
        prompt = f"""
        Supplier network analysis for {len(SUPPLIERS)} tracked suppliers:
        - High risk suppliers: {len(high_risk)} ({', '.join(s['name'] for s in high_risk)})
        - Average network reliability: {sum(s['reliability_score'] for s in SUPPLIERS) / len(SUPPLIERS):.1f}%
        - Suppliers with delays >5 days: {len([s for s in SUPPLIERS if s['average_delay_days'] > 5])}

        Provide supplier health assessment and sourcing recommendations.
        """
        analysis = await self._call_gemini(prompt)

        return self._build_result(
            analysis=analysis,
            recommendations=[
                "URGENT: Reduce Shanghai TechParts allocation from 35% to <20% immediately",
                "Increase TechCorp Asia allocation by 15% - best in class reliability",
                "Expand MexSource Solutions contract - USMCA benefits + near-shoring advantage",
                "Initiate quality audit for Vietnam Tech Supplies within 30 days",
                "Establish 6-month forward contract with Yunnan Electronics before Q3 price increase",
            ],
            risk_score=38.2,
            confidence=0.91,
            metadata={"high_risk_suppliers": len(high_risk), "network_avg_reliability": 83.7},
        )


# ─── SHIPMENT AGENT ───────────────────────────────────────────────────────────
class ShipmentAgent(BaseSupplySenseAgent):
    """
    Goal: Track shipments, predict delays, suggest alternatives, minimize disruptions
    Memory: Route history, carrier performance, weather patterns
    Tools: shipment_tracker, delay_predictor, route_optimizer, weather_api, traffic_api
    """

    def __init__(self):
        super().__init__(
            name="ShipmentAgent",
            goal="Ensure on-time delivery by monitoring all shipments in real-time and proactively addressing disruptions",
            tools=["shipment_tracker", "delay_predictor", "route_optimizer", "weather_api"],
        )

    def _mock_response(self, prompt: str) -> str:
        delayed = [s for s in SHIPMENTS if s["status"] == "delayed"]
        in_transit = [s for s in SHIPMENTS if s["status"] == "in_transit"]
        high_risk = [s for s in SHIPMENTS if s["delay_probability"] > 0.7]
        return (
            f"Shipment monitoring complete. {len(in_transit)} active, {len(delayed)} delayed. "
            f"{len(high_risk)} shipments with >70% delay probability. "
            f"SS-2024-0848 (Typhoon Mawar, $1.56M cargo) and SS-2024-0853 (tropical depression, $780K) require immediate rerouting. "
            f"Recommended reroute savings: $280K in avoided delays and damage claims."
        )

    async def analyze(self) -> AgentResult:
        delayed = [s for s in SHIPMENTS if s["status"] == "delayed"]
        high_risk = [s for s in SHIPMENTS if s["delay_probability"] > 0.7]
        total_value = sum(s["total_value_usd"] for s in SHIPMENTS)

        prompt = f"""
        Shipment network analysis:
        - Total tracked: {len(SHIPMENTS)}
        - Currently delayed: {len(delayed)}
        - High delay probability (>70%): {len(high_risk)}
        - Total cargo value in transit: ${total_value:,.0f}
        - Critical: Typhoon Mawar affecting 2 shipments

        Provide delay risk assessment and route optimization recommendations.
        """
        analysis = await self._call_gemini(prompt)

        return self._build_result(
            analysis=analysis,
            recommendations=[
                "IMMEDIATE: Reroute SS-2024-0848 via Malacca Strait (Typhoon Mawar on current path)",
                "IMMEDIATE: Reroute SS-2024-0853 via eastern Philippines (Tropical Depression)",
                "Alert TechCorp Asia to hold next sea shipment pending weather clearance",
                "Upgrade SS-2024-0850 CBP inspection status — coordinate with customs broker",
                "Switch SS-2024-0853 carrier to DHL Express for next 2 Vietnam shipments",
            ],
            risk_score=58.3,
            confidence=0.88,
            metadata={
                "delayed_count": len(delayed),
                "high_risk_count": len(high_risk),
                "total_cargo_value": total_value,
                "weather_events": 2,
            },
        )


# ─── DEMAND AGENT ─────────────────────────────────────────────────────────────
class DemandAgent(BaseSupplySenseAgent):
    """
    Goal: Forecast demand accurately, detect events (festival, promotion, seasonality)
    Memory: Historical sales, seasonal patterns, marketing calendar
    Tools: demand_forecast_model, seasonality_detector, event_calendar, promotion_tracker
    """

    def __init__(self):
        super().__init__(
            name="DemandAgent",
            goal="Generate accurate 30/60/90-day demand forecasts incorporating seasonality, events, and market signals",
            tools=["demand_forecast_model", "seasonality_detector", "event_calendar", "promotion_tracker"],
        )

    def _mock_response(self, prompt: str) -> str:
        return (
            "Demand forecast complete. 30-day outlook: +12.4% above baseline. "
            "Festival season detected July 18-22 (est. +45% demand spike for electronics). "
            "Back-to-school promotion July 10-13 (est. +30% for tablets/laptops). "
            "Confidence score: 91.2%. Recommend pre-positioning 3,000 additional units of electronics SKUs. "
            "Peak demand date identified: July 24, 2026."
        )

    async def analyze(self) -> AgentResult:
        prompt = """
        Generate supply chain demand forecast analysis:
        - Current demand index: 94.2 (+8.7% vs last period)
        - Detected events: Festival season (July 18-22), Back-to-school promo (July 10-13)
        - Seasonal trend: +12.4% expected next 30 days
        - Key SKUs: electronics category showing strongest demand signals

        Provide demand forecast summary and inventory pre-positioning recommendations.
        """
        analysis = await self._call_gemini(prompt)

        return self._build_result(
            analysis=analysis,
            recommendations=[
                "Pre-position 2,000 units electronics SKUs for festival season peak (July 24)",
                "Increase iPhone 15 Pro safety stock to 45 days during promotion period",
                "Activate promotional inventory reserves for Back-to-School campaign",
                "Reduce gaming SKU orders after August 15 — historical post-summer demand drop",
                "Gaming season demand surge: order RTX 4090 immediately (22% above baseline)",
            ],
            confidence=0.91,
            metadata={
                "forecast_horizon_days": 30,
                "confidence_score": 0.912,
                "demand_index": 94.2,
                "events_detected": ["Festival Season", "Back-to-School", "Gaming Season"],
            },
        )


# ─── RISK AGENT ───────────────────────────────────────────────────────────────
class RiskAgent(BaseSupplySenseAgent):
    """
    Goal: Monitor global risk signals, score supply chain risk, generate mitigation strategies
    Memory: Risk event history, impact assessments, resolution timelines
    Tools: weather_monitor, news_scanner, port_monitor, political_risk_api, risk_scorer
    """

    def __init__(self):
        super().__init__(
            name="RiskAgent",
            goal="Proactively identify and quantify supply chain risks across weather, political, supplier, and logistics dimensions",
            tools=["weather_monitor", "news_scanner", "port_monitor", "political_risk_api", "risk_scorer"],
        )

    def _mock_response(self, prompt: str) -> str:
        critical = [r for r in RISK_EVENTS if r["risk_level"] == "critical"]
        high = [r for r in RISK_EVENTS if r["risk_level"] == "high"]
        return (
            f"Risk assessment complete. Overall supply chain risk score: 34/100 (MODERATE). "
            f"{len(critical)} CRITICAL events: {critical[0]['title'] if critical else 'None'}. "
            f"{len(high)} HIGH events including Rotterdam port strike and Bangladesh flooding. "
            f"Estimated financial exposure: $3.2M if all active risks materialize. "
            f"With mitigation actions: $680K exposure."
        )

    async def analyze(self) -> AgentResult:
        critical_events = [r for r in RISK_EVENTS if r["risk_level"] == "critical"]
        high_events = [r for r in RISK_EVENTS if r["risk_level"] == "high"]

        prompt = f"""
        Global supply chain risk assessment:
        - Active risk events: {len(RISK_EVENTS)}
        - Critical (action required now): {len(critical_events)}
        - High risk (action required within 48h): {len(high_events)}
        - Top threats: {', '.join(r['title'] for r in RISK_EVENTS[:3])}
        - Overall risk score: 34/100

        Provide comprehensive risk analysis and mitigation strategy.
        """
        analysis = await self._call_gemini(prompt)

        return self._build_result(
            analysis=analysis,
            recommendations=[
                "CRITICAL: Reroute 2 shipments away from Typhoon Mawar path immediately",
                "HIGH: Pre-position Rotterdam buffer stock before July 22 strike",
                "HIGH: Activate Bangladesh flood contingency sourcing plan",
                "MEDIUM: Accelerate TSMC-dependent chip orders before shortage worsens",
                "MEDIUM: Shift Myanmar corridor shipments to sea routes",
            ],
            risk_score=34.0,
            confidence=0.92,
            metadata={
                "critical_events": len(critical_events),
                "high_events": len(high_events),
                "financial_exposure_usd": 3200000,
                "mitigated_exposure_usd": 680000,
            },
        )


# ─── PROCUREMENT AGENT ────────────────────────────────────────────────────────
class ProcurementAgent(BaseSupplySenseAgent):
    """
    Goal: Optimize purchasing decisions - right quantity, supplier, timing, and cost
    Memory: Price history, supplier agreements, demand forecasts
    Tools: price_optimizer, supplier_ranker, quantity_calculator, po_generator
    """

    def __init__(self):
        super().__init__(
            name="ProcurementAgent",
            goal="Minimize procurement costs while ensuring supply continuity through intelligent purchasing recommendations",
            tools=["price_optimizer", "supplier_ranker", "quantity_calculator", "po_generator"],
        )

    def _mock_response(self, prompt: str) -> str:
        total_cost = sum(r["expected_cost"] for r in PROCUREMENT_RECOMMENDATIONS)
        total_savings = sum(r["estimated_savings"] for r in PROCUREMENT_RECOMMENDATIONS)
        return (
            f"Procurement analysis complete. {len(PROCUREMENT_RECOMMENDATIONS)} purchase orders recommended. "
            f"Total procurement value: ${total_cost:,.0f}. "
            f"Estimated savings vs spot market: ${total_savings:,.0f} ({total_savings/total_cost*100:.1f}%). "
            f"3 CRITICAL orders require same-day approval to avoid stockouts."
        )

    async def analyze(self) -> AgentResult:
        critical = [r for r in PROCUREMENT_RECOMMENDATIONS if r["priority"] == "CRITICAL"]
        total_cost = sum(r["expected_cost"] for r in PROCUREMENT_RECOMMENDATIONS)
        total_savings = sum(r["estimated_savings"] for r in PROCUREMENT_RECOMMENDATIONS)

        prompt = f"""
        Procurement optimization analysis:
        - Recommended POs: {len(PROCUREMENT_RECOMMENDATIONS)}
        - Critical (immediate): {len(critical)}
        - Total procurement value: ${total_cost:,.0f}
        - Estimated savings: ${total_savings:,.0f}

        Provide procurement strategy and cost optimization recommendations.
        """
        analysis = await self._call_gemini(prompt)

        return self._build_result(
            analysis=analysis,
            recommendations=[
                f"Approve {len(critical)} critical purchase orders immediately — total value ${sum(r['expected_cost'] for r in critical):,.0f}",
                "Bundle iPhone + iPad orders to TechCorp Asia for $4,200 freight savings",
                "Lock in Yunnan Electronics Q3 pricing before August 1 increase (+7%)",
                "Negotiate MexSource Solutions volume discount at current order velocity",
                "Reduce Shanghai TechParts PO volume by 40% — redirect to TechCorp Asia",
            ],
            confidence=0.93,
            metadata={
                "total_pos": len(PROCUREMENT_RECOMMENDATIONS),
                "critical_pos": len(critical),
                "total_value_usd": total_cost,
                "total_savings_usd": total_savings,
                "savings_pct": total_savings / total_cost * 100 if total_cost > 0 else 0,
            },
        )


# ─── EXECUTIVE SUMMARY AGENT ─────────────────────────────────────────────────
class ExecutiveSummaryAgent(BaseSupplySenseAgent):
    """
    Goal: Aggregate all agent outputs into executive briefing, answer C-suite questions
    Memory: Full conversation history, past reports, executive preferences
    Tools: all_agent_outputs, report_generator, insight_ranker, pdf_generator
    """

    def __init__(self):
        super().__init__(
            name="ExecutiveSummaryAgent",
            goal="Transform complex supply chain data into actionable executive intelligence and board-ready reports",
            tools=["all_agent_outputs", "report_generator", "insight_ranker", "pdf_generator"],
        )
        self.sub_agents = {
            "inventory": InventoryAgent(),
            "supplier": SupplierAgent(),
            "shipment": ShipmentAgent(),
            "demand": DemandAgent(),
            "risk": RiskAgent(),
            "procurement": ProcurementAgent(),
        }

    def _mock_response(self, prompt: str) -> str:
        return get_copilot_response(prompt)

    async def answer_query(self, query: str) -> Dict[str, Any]:
        """Main entry point for Executive Copilot queries"""
        self._add_to_memory({"type": "query", "content": query})

        response_text = await self._call_gemini(
            f"""You are SupplySense AI, an executive-level supply chain intelligence assistant.
            
            Current context:
            - Supply chain health: 87/100
            - Critical alerts: 7 (3 stockouts, 2 weather events, 1 strike, 1 supplier risk)
            - Active suppliers: 47 (4 at risk)
            - Shipments in transit: 128 (12 delayed)
            
            User query: {query}
            
            Provide a detailed, data-driven response with specific numbers, product names, and actionable recommendations.
            Use markdown formatting with headers and bullet points where appropriate."""
        )

        return {
            "response": response_text,
            "agent": self.name,
            "confidence": 0.92,
            "sources_consulted": ["InventoryDB", "SupplierScores", "ShipmentTracker", "RiskMonitor"],
            "timestamp": datetime.now().isoformat(),
        }

    async def generate_report(self, report_type: str = "daily") -> Dict[str, Any]:
        """Generate executive report by consulting all sub-agents"""
        inventory_result = await self.sub_agents["inventory"].analyze()
        supplier_result = await self.sub_agents["supplier"].analyze()
        risk_result = await self.sub_agents["risk"].analyze()

        report_prompt = f"""
        Generate an executive supply chain briefing report.
        Type: {report_type}
        Date: {datetime.now().strftime('%B %d, %Y')}

        Inventory Agent findings: {inventory_result['analysis'][:500]}
        Supplier Agent findings: {supplier_result['analysis'][:500]}
        Risk Agent findings: {risk_result['analysis'][:500]}

        Format as a professional executive report with:
        1. Executive Summary (2-3 sentences)
        2. Critical Actions Required
        3. Performance vs Targets
        4. Risk Landscape
        5. Recommendations
        """

        report_content = await self._call_gemini(report_prompt)

        return {
            "title": f"SupplySense Executive Briefing — {datetime.now().strftime('%B %d, %Y')}",
            "type": report_type,
            "content": report_content,
            "health_score": 87,
            "critical_actions": 5,
            "agent_outputs": {
                "inventory": inventory_result,
                "supplier": supplier_result,
                "risk": risk_result,
            },
            "generated_at": datetime.now().isoformat(),
        }


# ─── AGENT REGISTRY ───────────────────────────────────────────────────────────
class AgentRegistry:
    """Central registry for all SupplySense AI agents"""

    def __init__(self):
        self.agents = {
            "inventory": InventoryAgent(),
            "supplier": SupplierAgent(),
            "shipment": ShipmentAgent(),
            "demand": DemandAgent(),
            "risk": RiskAgent(),
            "procurement": ProcurementAgent(),
            "executive": ExecutiveSummaryAgent(),
        }

    async def run_all_agents(self) -> Dict[str, AgentResult]:
        """Run all analysis agents and collect results"""
        results = {}
        for name, agent in self.agents.items():
            if name != "executive":
                try:
                    if hasattr(agent, 'analyze'):
                        results[name] = await agent.analyze()
                except Exception as e:
                    print(f"Agent {name} error: {e}")
        return results

    def get_agent_info(self) -> List[Dict]:
        """Get info about all registered agents"""
        return [
            {
                "id": name,
                "name": agent.name,
                "goal": agent.goal,
                "tools": agent.tools,
                "status": "active",
                "last_run": datetime.now().isoformat(),
            }
            for name, agent in self.agents.items()
        ]


# Global registry instance
agent_registry = AgentRegistry()
