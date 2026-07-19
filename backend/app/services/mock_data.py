"""
SupplySense Comprehensive Mock Data Service
Provides realistic supply chain data for all API endpoints
"""
from datetime import datetime, timedelta
import random
from typing import List, Dict, Any

# ─── COMPANIES ────────────────────────────────────────────────────────────────
COMPANIES = [
    {
        "id": 1,
        "name": "TechNova Corporation",
        "industry": "Electronics",
        "country": "USA",
        "subscription_plan": "enterprise",
    }
]

# ─── WAREHOUSES ───────────────────────────────────────────────────────────────
WAREHOUSES = [
    {
        "id": 1, "name": "Warehouse Alpha", "code": "WH-A",
        "city": "Chicago", "country": "USA", "lat": 41.8781, "lng": -87.6298,
        "total_capacity_sqft": 120000, "current_utilization_pct": 78.4,
        "incoming_trucks_today": 14, "outgoing_trucks_today": 9,
        "workers_count": 145, "efficiency_score": 88.2,
        "ai_recommendations": "Optimize Zone C storage layout to improve pick rates by 15%. Consider cross-docking for high-velocity SKUs."
    },
    {
        "id": 2, "name": "Warehouse Beta", "code": "WH-B",
        "city": "Los Angeles", "country": "USA", "lat": 34.0522, "lng": -118.2437,
        "total_capacity_sqft": 95000, "current_utilization_pct": 91.2,
        "incoming_trucks_today": 22, "outgoing_trucks_today": 18,
        "workers_count": 132, "efficiency_score": 72.1,
        "ai_recommendations": "CRITICAL: Warehouse Beta at 91% capacity. Recommend transferring 800 units of slow-moving items to Warehouse Delta immediately."
    },
    {
        "id": 3, "name": "Warehouse Gamma", "code": "WH-G",
        "city": "Dallas", "country": "USA", "lat": 32.7767, "lng": -96.7970,
        "total_capacity_sqft": 85000, "current_utilization_pct": 65.7,
        "incoming_trucks_today": 8, "outgoing_trucks_today": 11,
        "workers_count": 98, "efficiency_score": 91.5,
        "ai_recommendations": "Gamma has optimal capacity. Consider routing overflow from Beta here. Current efficiency is best across all warehouses."
    },
    {
        "id": 4, "name": "Warehouse Delta", "code": "WH-D",
        "city": "Atlanta", "country": "USA", "lat": 33.7490, "lng": -84.3880,
        "total_capacity_sqft": 110000, "current_utilization_pct": 58.3,
        "incoming_trucks_today": 6, "outgoing_trucks_today": 7,
        "workers_count": 115, "efficiency_score": 84.7,
        "ai_recommendations": "Delta has significant available capacity (41.7%). Recommend accepting overflow transfers from Beta and increasing inbound throughput."
    },
    {
        "id": 5, "name": "Warehouse Epsilon", "code": "WH-E",
        "city": "Seattle", "country": "USA", "lat": 47.6062, "lng": -122.3321,
        "total_capacity_sqft": 75000, "current_utilization_pct": 82.1,
        "incoming_trucks_today": 11, "outgoing_trucks_today": 13,
        "workers_count": 89, "efficiency_score": 86.3,
        "ai_recommendations": "Epsilon performing well. Seasonal demand spike expected in Q4 - pre-position 2,000 units of electronics SKUs by September 15."
    },
]

# ─── SUPPLIERS ─────────────────────────────────────────────────────────────────
SUPPLIERS = [
    {
        "id": 1, "name": "TechCorp Asia", "country": "China", "city": "Shenzhen",
        "reliability_score": 92.4, "quality_rating": 4.6, "on_time_delivery_pct": 94.1,
        "average_lead_time_days": 12, "average_delay_days": 0.8, "late_shipments_count": 3,
        "total_shipments": 156, "risk_score": 12.0, "status": "active",
        "contact_email": "ops@techcorpasia.com",
        "ai_explanation": "TechCorp Asia continues to be our top-performing supplier with a 94.1% on-time delivery rate, 8% above industry average. Recent investments in their Shenzhen facility have reduced lead times by 2 days. Recommend increasing order allocation by 15%.",
    },
    {
        "id": 2, "name": "Shanghai TechParts Ltd.", "country": "China", "city": "Shanghai",
        "reliability_score": 61.3, "quality_rating": 3.4, "on_time_delivery_pct": 67.8,
        "average_lead_time_days": 21, "average_delay_days": 8.7, "late_shipments_count": 28,
        "total_shipments": 87, "risk_score": 78.5, "status": "at_risk",
        "contact_email": "logistics@shtechparts.cn",
        "ai_explanation": "HIGH RISK: Shanghai TechParts delivery delays increased 172% over 30 days. Root cause: Yangshan port congestion + factory capacity issues. Recommend reducing dependency to <20% of procurement and initiating dual-sourcing with TechCorp Asia immediately.",
    },
    {
        "id": 3, "name": "Yunnan Electronics", "country": "China", "city": "Kunming",
        "reliability_score": 87.9, "quality_rating": 4.3, "on_time_delivery_pct": 89.2,
        "average_lead_time_days": 15, "average_delay_days": 1.9, "late_shipments_count": 7,
        "total_shipments": 64, "risk_score": 22.0, "status": "active",
        "contact_email": "export@yunnanelec.com",
        "ai_explanation": "Yunnan Electronics performing at 89.2% on-time delivery, 12% above segment average. Quality scores improved 8% this quarter following ISO 9001:2015 certification. Recommend increasing order allocation by 20% and establishing a 6-month forward contract.",
    },
    {
        "id": 4, "name": "GlobalParts Inc.", "country": "Germany", "city": "Munich",
        "reliability_score": 95.1, "quality_rating": 4.8, "on_time_delivery_pct": 96.7,
        "average_lead_time_days": 18, "average_delay_days": 0.5, "late_shipments_count": 2,
        "total_shipments": 61, "risk_score": 8.0, "status": "active",
        "contact_email": "supply@globalparts.de",
        "ai_explanation": "GlobalParts Inc. is our highest-rated supplier with 96.7% on-time delivery. Premium pricing justified by zero defect rate (<0.01%). European operations provide geopolitical diversity. Ideal for critical components requiring maximum reliability.",
    },
    {
        "id": 5, "name": "IndoParts Manufacturing", "country": "India", "city": "Bangalore",
        "reliability_score": 78.2, "quality_rating": 3.9, "on_time_delivery_pct": 80.5,
        "average_lead_time_days": 22, "average_delay_days": 4.2, "late_shipments_count": 15,
        "total_shipments": 77, "risk_score": 35.0, "status": "active",
        "contact_email": "export@indoparts.in",
        "ai_explanation": "IndoParts shows moderate risk (35/100). Monsoon season (June-September) historically causes 3-4 day delays. Recommend building 30-day safety stock before June and establishing contingency sourcing from Yunnan Electronics.",
    },
    {
        "id": 6, "name": "MexSource Solutions", "country": "Mexico", "city": "Monterrey",
        "reliability_score": 83.6, "quality_rating": 4.1, "on_time_delivery_pct": 85.3,
        "average_lead_time_days": 8, "average_delay_days": 1.4, "late_shipments_count": 9,
        "total_shipments": 52, "risk_score": 25.0, "status": "active",
        "contact_email": "logistics@mexsource.mx",
        "ai_explanation": "MexSource benefits from USMCA trade advantages and short transit times to US warehouses (avg 2.8 days). Near-shoring reduces supply chain risk. Recommended for expanding electronics component sourcing to reduce China dependency.",
    },
    {
        "id": 7, "name": "Vietnam Tech Supplies", "country": "Vietnam", "city": "Ho Chi Minh City",
        "reliability_score": 74.8, "quality_rating": 3.7, "on_time_delivery_pct": 76.2,
        "average_lead_time_days": 20, "average_delay_days": 5.6, "late_shipments_count": 19,
        "total_shipments": 80, "risk_score": 42.0, "status": "active",
        "contact_email": "ops@vntechsupply.vn",
        "ai_explanation": "Vietnam Tech Supplies shows elevated risk (42/100) due to Cat Lai port congestion and inconsistent QC. Recommend quality audit within 30 days. Low pricing (18% below market) partially offsets risks.",
    },
    {
        "id": 8, "name": "EuroComp GmbH", "country": "Germany", "city": "Berlin",
        "reliability_score": 91.7, "quality_rating": 4.7, "on_time_delivery_pct": 93.4,
        "average_lead_time_days": 16, "average_delay_days": 1.1, "late_shipments_count": 4,
        "total_shipments": 58, "risk_score": 14.0, "status": "active",
        "contact_email": "b2b@eurocomp.de",
        "ai_explanation": "EuroComp GmbH delivers premium components with industry-leading quality. Berlin facility Q3 expansion increases capacity by 35%, enabling scale without lead time impact.",
    },
]

# ─── PRODUCTS ──────────────────────────────────────────────────────────────────
PRODUCTS = [
    {"id": 1, "sku": "SKU-IPPH15P", "name": "iPhone 15 Pro", "category": "electronics", "unit_cost": 850.0, "selling_price": 1199.0, "supplier_id": 1, "weight_kg": 0.19},
    {"id": 2, "sku": "SKU-SGS24U", "name": "Samsung Galaxy S24 Ultra", "category": "electronics", "unit_cost": 780.0, "selling_price": 1099.0, "supplier_id": 3, "weight_kg": 0.23},
    {"id": 3, "sku": "SKU-AIRPD4", "name": "AirPods Pro 4", "category": "electronics", "unit_cost": 180.0, "selling_price": 249.0, "supplier_id": 1, "weight_kg": 0.06},
    {"id": 4, "sku": "SKU-MCBKAIR", "name": "MacBook Air M3", "category": "electronics", "unit_cost": 950.0, "selling_price": 1299.0, "supplier_id": 1, "weight_kg": 1.24},
    {"id": 5, "sku": "SKU-SNYPS5", "name": "Sony PlayStation 5", "category": "electronics", "unit_cost": 399.0, "selling_price": 499.0, "supplier_id": 2, "weight_kg": 3.9},
    {"id": 6, "sku": "SKU-DLXMON", "name": "Dell 27in 4K Monitor", "category": "electronics", "unit_cost": 320.0, "selling_price": 449.0, "supplier_id": 8, "weight_kg": 6.2},
    {"id": 7, "sku": "SKU-LGWSH", "name": "LG Washing Machine 8KG", "category": "electronics", "unit_cost": 280.0, "selling_price": 399.0, "supplier_id": 5, "weight_kg": 65.0},
    {"id": 8, "sku": "SKU-NKESHOE", "name": "Nike Air Max 270", "category": "apparel", "unit_cost": 65.0, "selling_price": 149.0, "supplier_id": 6, "weight_kg": 0.35},
    {"id": 9, "sku": "SKU-ADIDAS4", "name": "Adidas Ultraboost 24", "category": "apparel", "unit_cost": 78.0, "selling_price": 180.0, "supplier_id": 7, "weight_kg": 0.38},
    {"id": 10, "sku": "SKU-DRPHARMA", "name": "Paracetamol 500mg Box/100", "category": "pharmaceutical", "unit_cost": 4.5, "selling_price": 12.0, "supplier_id": 4, "weight_kg": 0.12},
    {"id": 11, "sku": "SKU-RTRBRD", "name": "RTX 4090 Graphics Card", "category": "electronics", "unit_cost": 1200.0, "selling_price": 1599.0, "supplier_id": 2, "weight_kg": 1.4},
    {"id": 12, "sku": "SKU-INTCPU", "name": "Intel Core i9-14900K", "category": "electronics", "unit_cost": 420.0, "selling_price": 589.0, "supplier_id": 8, "weight_kg": 0.03},
    {"id": 13, "sku": "SKU-BOSCHDR", "name": "Bosch Power Drill Set", "category": "industrial", "unit_cost": 95.0, "selling_price": 169.0, "supplier_id": 4, "weight_kg": 2.1},
    {"id": 14, "sku": "SKU-SPKMINI", "name": "JBL Bluetooth Speaker", "category": "electronics", "unit_cost": 55.0, "selling_price": 99.0, "supplier_id": 3, "weight_kg": 0.55},
    {"id": 15, "sku": "SKU-TABLET10", "name": "iPad Pro 11-inch M4", "category": "electronics", "unit_cost": 750.0, "selling_price": 999.0, "supplier_id": 1, "weight_kg": 0.44},
]

# ─── INVENTORY ─────────────────────────────────────────────────────────────────
INVENTORY = [
    {"id": 1, "product_id": 1, "warehouse_id": 1, "current_stock": 248, "reserved_stock": 45, "incoming_stock": 0, "outgoing_stock": 32, "safety_stock": 200, "days_remaining": 5.8, "ai_action": "ORDER NOW", "ai_recommendation": "Critical: Stock depletes in 5.8 days. Order 500 units from TechCorp Asia immediately. Lead time 12 days - already past reorder point."},
    {"id": 2, "product_id": 2, "warehouse_id": 1, "current_stock": 512, "reserved_stock": 128, "incoming_stock": 200, "outgoing_stock": 65, "safety_stock": 300, "days_remaining": 18.4, "ai_action": "OPTIMAL", "ai_recommendation": "Samsung Galaxy S24 Ultra inventory healthy. 200 units incoming from Yunnan Electronics on July 21. No action required."},
    {"id": 3, "product_id": 3, "warehouse_id": 2, "current_stock": 89, "reserved_stock": 20, "incoming_stock": 0, "outgoing_stock": 15, "safety_stock": 150, "days_remaining": 4.1, "ai_action": "ORDER NOW", "ai_recommendation": "AirPods Pro 4 critically low. Emergency order of 350 units recommended. Consider transferring 80 units from Warehouse Alpha reserve."},
    {"id": 4, "product_id": 4, "warehouse_id": 1, "current_stock": 145, "reserved_stock": 28, "incoming_stock": 100, "outgoing_stock": 18, "safety_stock": 100, "days_remaining": 21.7, "ai_action": "OPTIMAL", "ai_recommendation": "MacBook Air M3 stock levels satisfactory with 100 units inbound. No action required."},
    {"id": 5, "product_id": 5, "warehouse_id": 3, "current_stock": 67, "reserved_stock": 12, "incoming_stock": 150, "outgoing_stock": 22, "safety_stock": 80, "days_remaining": 8.3, "ai_action": "TRANSFER", "ai_recommendation": "Transfer 120 units from Warehouse Delta to Warehouse Gamma to cover demand during incoming shipment transit."},
    {"id": 6, "product_id": 6, "warehouse_id": 4, "current_stock": 334, "reserved_stock": 55, "incoming_stock": 0, "outgoing_stock": 28, "safety_stock": 150, "days_remaining": 34.2, "ai_action": "OPTIMAL", "ai_recommendation": "Dell Monitor stock well above safety levels. Consider reducing next order quantity by 20%."},
    {"id": 7, "product_id": 11, "warehouse_id": 2, "current_stock": 43, "reserved_stock": 8, "incoming_stock": 0, "outgoing_stock": 12, "safety_stock": 60, "days_remaining": 3.2, "ai_action": "ORDER NOW", "ai_recommendation": "RTX 4090 CRITICALLY LOW at 3.2 days. Demand spike detected (gaming season). Order 200 units immediately. Expedited shipping recommended."},
    {"id": 8, "product_id": 12, "warehouse_id": 1, "current_stock": 892, "reserved_stock": 200, "incoming_stock": 500, "outgoing_stock": 145, "safety_stock": 400, "days_remaining": 28.1, "ai_action": "OPTIMAL", "ai_recommendation": "Intel CPU inventory healthy. Large incoming shipment of 500 units expected July 23."},
    {"id": 9, "product_id": 8, "warehouse_id": 5, "current_stock": 1245, "reserved_stock": 380, "incoming_stock": 800, "outgoing_stock": 220, "safety_stock": 600, "days_remaining": 25.6, "ai_action": "OPTIMAL", "ai_recommendation": "Nike Air Max stock adequate. Back-to-school promotion may accelerate velocity."},
    {"id": 10, "product_id": 15, "warehouse_id": 3, "current_stock": 178, "reserved_stock": 42, "incoming_stock": 0, "outgoing_stock": 35, "safety_stock": 150, "days_remaining": 11.2, "ai_action": "TRANSFER", "ai_recommendation": "iPad Pro below reorder threshold. Transfer 100 units from Warehouse Alpha reserve or place order with TechCorp Asia."},
]

# ─── SHIPMENTS ─────────────────────────────────────────────────────────────────
BASE_DATE = datetime.now()

SHIPMENTS = [
    {
        "id": 1, "tracking_number": "SS-2024-0847", "status": "in_transit", "mode": "sea",
        "supplier_id": 1, "supplier_name": "TechCorp Asia", "warehouse_id": 1, "warehouse_name": "Warehouse Alpha",
        "origin_city": "Shenzhen", "origin_country": "China",
        "destination_city": "Los Angeles", "destination_country": "USA",
        "current_lat": 28.5, "current_lng": 152.3, "current_location_name": "Pacific Ocean (Mid-route)",
        "estimated_arrival": (BASE_DATE + timedelta(days=4)).isoformat(),
        "delay_hours": 0, "delay_probability": 0.12,
        "weather_impact": "Mild swells - no significant impact",
        "carrier": "Pacific Star Shipping",
        "total_weight_kg": 18500, "total_value_usd": 2840000, "delay_reason": None,
    },
    {
        "id": 2, "tracking_number": "SS-2024-0848", "status": "delayed", "mode": "sea",
        "supplier_id": 2, "supplier_name": "Shanghai TechParts Ltd.", "warehouse_id": 2, "warehouse_name": "Warehouse Beta",
        "origin_city": "Shanghai", "origin_country": "China",
        "destination_city": "Houston", "destination_country": "USA",
        "current_lat": 19.2, "current_lng": 148.7, "current_location_name": "South China Sea",
        "estimated_arrival": (BASE_DATE + timedelta(days=7)).isoformat(),
        "delay_hours": 18.5, "delay_probability": 0.87,
        "weather_impact": "Typhoon Mawar Category 2 approaching route",
        "traffic_impact": "Port of Shanghai congestion: 2.3 day wait",
        "carrier": "Dragon Freight Lines",
        "total_weight_kg": 12400, "total_value_usd": 1560000,
        "delay_reason": "Typhoon Mawar rerouting + Shanghai port congestion",
        "alternative_route": "Rerouting via Strait of Malacca adds 2 days but avoids typhoon zone. New ETA: July 27.",
    },
    {
        "id": 3, "tracking_number": "SS-2024-0849", "status": "in_transit", "mode": "air",
        "supplier_id": 4, "supplier_name": "GlobalParts Inc.", "warehouse_id": 1, "warehouse_name": "Warehouse Alpha",
        "origin_city": "Munich", "origin_country": "Germany",
        "destination_city": "Chicago", "destination_country": "USA",
        "current_lat": 53.4, "current_lng": -18.2, "current_location_name": "North Atlantic Airspace",
        "estimated_arrival": (BASE_DATE + timedelta(hours=8)).isoformat(),
        "delay_hours": 0, "delay_probability": 0.05,
        "weather_impact": "Clear skies - no impact",
        "carrier": "Lufthansa Cargo",
        "total_weight_kg": 2800, "total_value_usd": 890000, "delay_reason": None,
    },
    {
        "id": 4, "tracking_number": "SS-2024-0850", "status": "at_customs", "mode": "sea",
        "supplier_id": 5, "supplier_name": "IndoParts Manufacturing", "warehouse_id": 3, "warehouse_name": "Warehouse Gamma",
        "origin_city": "Mumbai", "origin_country": "India",
        "destination_city": "Dallas", "destination_country": "USA",
        "current_lat": 34.05, "current_lng": -118.24, "current_location_name": "Los Angeles CA Customs",
        "estimated_arrival": (BASE_DATE + timedelta(days=2)).isoformat(),
        "delay_hours": 36, "delay_probability": 0.65,
        "weather_impact": "None",
        "traffic_impact": "CBP inspection queue: 36-hour average wait",
        "carrier": "Maersk Container",
        "total_weight_kg": 9200, "total_value_usd": 425000,
        "delay_reason": "CBP enhanced inspection selected",
    },
    {
        "id": 5, "tracking_number": "SS-2024-0851", "status": "in_transit", "mode": "road",
        "supplier_id": 6, "supplier_name": "MexSource Solutions", "warehouse_id": 4, "warehouse_name": "Warehouse Delta",
        "origin_city": "Monterrey", "origin_country": "Mexico",
        "destination_city": "Atlanta", "destination_country": "USA",
        "current_lat": 29.8, "current_lng": -96.4, "current_location_name": "Texas USA I-10 E",
        "estimated_arrival": (BASE_DATE + timedelta(hours=14)).isoformat(),
        "delay_hours": 2, "delay_probability": 0.22,
        "weather_impact": "Minor rain - negligible impact",
        "carrier": "Trans-Am Logistics",
        "total_weight_kg": 5400, "total_value_usd": 312000, "delay_reason": None,
    },
    {
        "id": 6, "tracking_number": "SS-2024-0852", "status": "delivered", "mode": "air",
        "supplier_id": 8, "supplier_name": "EuroComp GmbH", "warehouse_id": 5, "warehouse_name": "Warehouse Epsilon",
        "origin_city": "Berlin", "origin_country": "Germany",
        "destination_city": "Seattle", "destination_country": "USA",
        "current_lat": 47.45, "current_lng": -122.31, "current_location_name": "Seattle-Tacoma Airport",
        "estimated_arrival": (BASE_DATE - timedelta(hours=3)).isoformat(),
        "delay_hours": 0, "delay_probability": 0.0,
        "weather_impact": "None", "carrier": "DHL Express",
        "total_weight_kg": 1800, "total_value_usd": 650000, "delay_reason": None,
    },
    {
        "id": 7, "tracking_number": "SS-2024-0853", "status": "delayed", "mode": "sea",
        "supplier_id": 7, "supplier_name": "Vietnam Tech Supplies", "warehouse_id": 2, "warehouse_name": "Warehouse Beta",
        "origin_city": "Ho Chi Minh City", "origin_country": "Vietnam",
        "destination_city": "Long Beach", "destination_country": "USA",
        "current_lat": 15.8, "current_lng": 118.5, "current_location_name": "Philippine Sea",
        "estimated_arrival": (BASE_DATE + timedelta(days=9)).isoformat(),
        "delay_hours": 48, "delay_probability": 0.92,
        "weather_impact": "Tropical Depression - avoiding storm path",
        "carrier": "COSCO Shipping",
        "total_weight_kg": 14200, "total_value_usd": 780000,
        "delay_reason": "Tropical depression rerouting adds 2 days",
        "alternative_route": "Current route via eastern Philippines adds 2 days. Direct route risk 95% - not recommended.",
    },
]

# ─── RISK EVENTS ───────────────────────────────────────────────────────────────
RISK_EVENTS = [
    {
        "id": 1, "title": "Typhoon Mawar - South China Sea",
        "description": "Typhoon Mawar (Category 2, winds 110mph) tracking NE through South China Sea. Expected landfall near Philippines in 48-72 hours.",
        "event_type": "weather", "risk_level": "critical", "risk_score": 87.0,
        "impact_level": "CRITICAL",
        "affected_regions": ["South China Sea", "Philippines", "Vietnam Coast", "Taiwan Strait"],
        "affected_suppliers": [2, 7],
        "mitigation_strategy": "1) Reroute SS-2024-0848 and SS-2024-0853 via Malacca Strait immediately. 2) Alert suppliers to hold shipments until July 21. 3) Activate safety stock for affected SKUs.",
        "ai_analysis": "Historical typhoon analysis indicates 87% probability of affecting our sea freight lanes. Based on 2019 Typhoon Mitag data, similar events caused average 4.2-day delays and $2.1M supply disruption. Mitigation reduces impact to 1.8 days and $680K.",
        "source": "NOAA Pacific Typhoon Center", "is_active": 1,
    },
    {
        "id": 2, "title": "Rotterdam Port Strike - Industrial Action",
        "description": "Dock workers at Port of Rotterdam announced 72-hour strike starting July 22. Largest European port by cargo volume.",
        "event_type": "strike", "risk_level": "high", "risk_score": 72.0,
        "impact_level": "HIGH",
        "affected_regions": ["Netherlands", "Germany", "Belgium", "Northern Europe"],
        "affected_suppliers": [4, 8],
        "mitigation_strategy": "1) Reroute European shipments to Antwerp or Hamburg. 2) Pre-position buffer stock from suppliers 4 and 8 before July 22. 3) Negotiate expedited customs at alternative ports.",
        "ai_analysis": "Rotterdam handles 15% of our European supplier shipments. Strike history shows average 5-day resolution. Antwerp has 23% spare capacity. Estimated disruption cost: $340K over 72-hour strike.",
        "source": "FNV Transport and Logistics Union", "is_active": 1,
    },
    {
        "id": 3, "title": "Bangladesh Flooding - Textile Supply Chain",
        "description": "Severe monsoon flooding in Dhaka and Chittagong industrial zones. 40+ factories temporarily closed.",
        "event_type": "flood", "risk_level": "high", "risk_score": 65.0,
        "impact_level": "HIGH",
        "affected_regions": ["Bangladesh", "Eastern India"],
        "affected_suppliers": [5],
        "mitigation_strategy": "1) Activate alternative apparel suppliers in Mexico and Vietnam. 2) Increase safety stock by 45 days for affected SKUs. 3) Expedite current order from MexSource Solutions.",
        "ai_analysis": "Bangladesh flooding typically affects supply chains 3-6 weeks. Our apparel procurement represents 8% of category spend. Alternative sourcing from MexSource covers 70% of demand gap with 6-day adjustment.",
        "source": "BDMD Disaster Management Authority", "is_active": 1,
    },
    {
        "id": 4, "title": "Semiconductor Shortage - TSMC Production Constraint",
        "description": "TSMC reporting 15% capacity reduction due to facility maintenance in Hsinchu Science Park.",
        "event_type": "supplier_issue", "risk_level": "medium", "risk_score": 48.0,
        "impact_level": "MEDIUM",
        "affected_regions": ["Taiwan", "East Asia"],
        "affected_suppliers": [1, 3],
        "mitigation_strategy": "1) Accelerate chip procurement orders. 2) Explore Samsung Foundry as backup. 3) Reduce non-critical electronics orders by 10% to preserve semiconductor supply.",
        "ai_analysis": "TSMC produces chips used by 23% of our electronics suppliers. Historical constraints caused 6-8 week downstream inventory impacts. Current safety stock provides 34-day buffer.",
        "source": "Industry intelligence + supplier alerts", "is_active": 1,
    },
    {
        "id": 5, "title": "Political Instability - Myanmar Trade Route",
        "description": "Border tensions affecting Muse-Ruili China-Myanmar corridor, key overland route for Southeast Asia goods.",
        "event_type": "political", "risk_level": "medium", "risk_score": 38.0,
        "impact_level": "MEDIUM",
        "affected_regions": ["Myanmar", "Yunnan Province China", "Southeast Asia"],
        "affected_suppliers": [3, 7],
        "mitigation_strategy": "1) Shift Yunnan Electronics to sea freight via Guangzhou. 2) Increase buffer from Vietnam Tech Supplies. 3) Monitor Foreign Affairs alerts daily.",
        "ai_analysis": "Muse-Ruili corridor handles 12% of our overland freight from SE Asia. Level 2 disruption historically resolves in 14-21 days. Sea alternative adds 8 days and 18% shipping cost.",
        "source": "US State Department + USCIB", "is_active": 1,
    },
]

# ─── DEMAND FORECAST ──────────────────────────────────────────────────────────
def generate_demand_forecast(product_id: int = 1, days: int = 30):
    forecast = []
    base_demand = 85 + random.randint(-10, 10)
    for i in range(days):
        date = BASE_DATE + timedelta(days=i)
        weekend_boost = 1.25 if date.weekday() >= 5 else 1.0
        festival_boost = 1.45 if 18 <= i <= 22 else 1.0
        promo_boost = 1.3 if 10 <= i <= 13 else 1.0
        seasonal = 1.0 + 0.1 * (i / 30)
        noise = random.uniform(0.88, 1.12)
        predicted = base_demand * weekend_boost * festival_boost * promo_boost * seasonal * noise
        confidence_score = random.uniform(0.82, 0.95)
        margin = predicted * (1 - confidence_score) * 1.5
        forecast.append({
            "date": date.strftime("%Y-%m-%d"),
            "predicted_demand": round(predicted, 1),
            "confidence_lower": round(predicted - margin, 1),
            "confidence_upper": round(predicted + margin, 1),
            "confidence_score": round(confidence_score, 3),
            "is_festival": 18 <= i <= 22,
            "is_promotion": 10 <= i <= 13,
            "is_weekend": date.weekday() >= 5,
        })
    return forecast

# ─── DASHBOARD OVERVIEW ──────────────────────────────────────────────────────
def get_dashboard_overview():
    return {
        "supply_chain_health_score": 87,
        "health_status": "HEALTHY",
        "health_trend": "+2.4% vs last week",
        "inventory_status": {
            "total_value_usd": 24700000,
            "total_value_change_pct": 3.2,
            "total_skus": 248,
            "low_stock_items": 7,
            "critical_stock_items": 3,
        },
        "supplier_reliability": {
            "total_suppliers": 47,
            "at_risk_count": 4,
            "high_reliability_count": 28,
            "average_score": 83.7,
        },
        "delayed_shipments": {
            "total_in_transit": 128,
            "delayed_count": 12,
            "average_delay_hours": 14.3,
            "on_time_pct": 90.6,
        },
        "warehouse_capacity": {
            "average_utilization_pct": 73.4,
            "critical_warehouses": 1,
            "total_warehouses": 5,
        },
        "demand_forecast": {
            "trend": "+12.4% next 30 days",
            "demand_index": 94.2,
            "demand_index_change": 8.7,
            "peak_date": "2026-07-24",
            "peak_reason": "Festival Season",
        },
        "risk_score": 34,
        "risk_level": "MODERATE",
        "critical_alerts_count": 7,
        "performance_trend": [
            {"month": "Jan", "health": 78, "efficiency": 82, "reliability": 79},
            {"month": "Feb", "health": 80, "efficiency": 84, "reliability": 81},
            {"month": "Mar", "health": 79, "efficiency": 83, "reliability": 80},
            {"month": "Apr", "health": 83, "efficiency": 86, "reliability": 84},
            {"month": "May", "health": 84, "efficiency": 85, "reliability": 86},
            {"month": "Jun", "health": 82, "efficiency": 88, "reliability": 85},
            {"month": "Jul", "health": 87, "efficiency": 89, "reliability": 87},
        ],
        "ai_summary": (
            "Overall supply chain health is at 87/100 - STRONG. Seven critical alerts require immediate attention: "
            "3 SKUs face stockout within 5 days (iPhone 15 Pro, AirPods Pro 4, RTX 4090), and Typhoon Mawar is "
            "affecting 2 active sea freight shipments with combined cargo value of $2.34M. Supplier Shanghai TechParts "
            "remains HIGH risk with 78.5 risk score. Recommend prioritizing emergency reorder actions and rerouting "
            "SS-2024-0848 immediately."
        ),
        "today_recommendations": [
            {"priority": "CRITICAL", "action": "Order 500 units iPhone 15 Pro from TechCorp Asia", "reason": "Stock depletes in 5.8 days, 2 days past reorder point", "eta_impact": "12-day lead time, order by July 18"},
            {"priority": "CRITICAL", "action": "Reroute Shipment SS-2024-0848 via Malacca Strait", "reason": "Typhoon Mawar Category 2 on current route", "estimated_savings": "$280K avoided", "eta_impact": "Adds 2 days but ensures cargo safety"},
            {"priority": "HIGH", "action": "Transfer 120 units PS5 from WH-D to WH-G", "reason": "WH-G demand surge, WH-D has excess", "estimated_savings": "$45K", "eta_impact": "Covers demand during transit"},
            {"priority": "HIGH", "action": "Reduce Shanghai TechParts allocation by 40%", "reason": "Risk score 78.5, delays up 172%", "estimated_savings": "Risk mitigation $890K", "eta_impact": "Shift to TechCorp Asia"},
            {"priority": "MEDIUM", "action": "Pre-position Rotterdam strike buffer stock", "reason": "72-hour strike confirmed July 22", "estimated_savings": "$340K", "eta_impact": "Expedite orders before July 21"},
        ],
        "critical_alerts": [
            {"id": 1, "title": "iPhone 15 Pro: 5.8 days stock remaining", "severity": "critical", "time": "2 hours ago"},
            {"id": 2, "title": "Typhoon Mawar affecting 2 shipments ($2.34M)", "severity": "critical", "time": "4 hours ago"},
            {"id": 3, "title": "AirPods Pro 4: 4.1 days stock remaining", "severity": "critical", "time": "3 hours ago"},
            {"id": 4, "title": "Shanghai TechParts reliability dropped to 61.3%", "severity": "high", "time": "6 hours ago"},
            {"id": 5, "title": "Warehouse Beta at 91.2% capacity", "severity": "high", "time": "1 hour ago"},
            {"id": 6, "title": "Rotterdam port strike July 22 confirmed", "severity": "high", "time": "8 hours ago"},
            {"id": 7, "title": "RTX 4090: 3.2 days stock remaining", "severity": "critical", "time": "1 hour ago"},
        ],
        "supplier_reliability_breakdown": [
            {"name": "High (85-100)", "value": 28, "fill": "#10B981"},
            {"name": "Medium (60-84)", "value": 15, "fill": "#F59E0B"},
            {"name": "At Risk (<60)", "value": 4, "fill": "#EF4444"},
        ]
    }

# ─── PROCUREMENT RECOMMENDATIONS ─────────────────────────────────────────────
PROCUREMENT_RECOMMENDATIONS = [
    {
        "id": 1, "product_id": 1, "product_name": "iPhone 15 Pro", "sku": "SKU-IPPH15P",
        "recommended_quantity": 500,
        "recommended_supplier_id": 1, "recommended_supplier_name": "TechCorp Asia",
        "recommended_warehouse_id": 1, "recommended_warehouse_name": "Warehouse Alpha",
        "expected_cost": 425000.0, "estimated_savings": 38250.0, "savings_pct": 9.0,
        "recommended_order_date": (BASE_DATE + timedelta(days=1)).strftime("%Y-%m-%d"),
        "expected_delivery_date": (BASE_DATE + timedelta(days=13)).strftime("%Y-%m-%d"),
        "ai_reasoning": "iPhone 15 Pro inventory will reach zero in 5.8 days at current 43 units/day velocity. Ordering 500 units from TechCorp Asia at $850/unit (vs $935 spot price) saves $85/unit. Emergency order before July 19 avoids stockout and maintains $1.2M monthly revenue.",
        "priority": "CRITICAL",
    },
    {
        "id": 2, "product_id": 3, "product_name": "AirPods Pro 4", "sku": "SKU-AIRPD4",
        "recommended_quantity": 350,
        "recommended_supplier_id": 1, "recommended_supplier_name": "TechCorp Asia",
        "recommended_warehouse_id": 2, "recommended_warehouse_name": "Warehouse Beta",
        "expected_cost": 63000.0, "estimated_savings": 8820.0, "savings_pct": 14.0,
        "recommended_order_date": (BASE_DATE + timedelta(days=1)).strftime("%Y-%m-%d"),
        "expected_delivery_date": (BASE_DATE + timedelta(days=13)).strftime("%Y-%m-%d"),
        "ai_reasoning": "AirPods Pro 4 at critically low stock (89 units, 4.1 days). 350 units covers 45-day forward demand including seasonal uplift. TechCorp Asia pricing at $180/unit (14% below spot) leverages volume discount.",
        "priority": "CRITICAL",
    },
    {
        "id": 3, "product_id": 11, "product_name": "RTX 4090 Graphics Card", "sku": "SKU-RTRBRD",
        "recommended_quantity": 200,
        "recommended_supplier_id": 3, "recommended_supplier_name": "Yunnan Electronics",
        "recommended_warehouse_id": 2, "recommended_warehouse_name": "Warehouse Beta",
        "expected_cost": 240000.0, "estimated_savings": 28800.0, "savings_pct": 12.0,
        "recommended_order_date": BASE_DATE.strftime("%Y-%m-%d"),
        "expected_delivery_date": (BASE_DATE + timedelta(days=15)).strftime("%Y-%m-%d"),
        "ai_reasoning": "RTX 4090 at 3.2 days - most critical item. Gaming season demand surge (22% above baseline). Yunnan Electronics has 3x better NVIDIA allocation than TechCorp Asia currently. Air freight surcharge of $18K included - necessary.",
        "priority": "CRITICAL",
    },
    {
        "id": 4, "product_id": 2, "product_name": "Samsung Galaxy S24 Ultra", "sku": "SKU-SGS24U",
        "recommended_quantity": 300,
        "recommended_supplier_id": 3, "recommended_supplier_name": "Yunnan Electronics",
        "recommended_warehouse_id": 1, "recommended_warehouse_name": "Warehouse Alpha",
        "expected_cost": 234000.0, "estimated_savings": 21060.0, "savings_pct": 9.0,
        "recommended_order_date": (BASE_DATE + timedelta(days=7)).strftime("%Y-%m-%d"),
        "expected_delivery_date": (BASE_DATE + timedelta(days=22)).strftime("%Y-%m-%d"),
        "ai_reasoning": "Samsung Galaxy S24 Ultra demand forecast shows 18% increase in August (back-to-school). Proactively ordering 300 units secures Yunnan Q3 pricing before their 7% annual increase on August 1.",
        "priority": "MEDIUM",
    },
    {
        "id": 5, "product_id": 15, "product_name": "iPad Pro 11-inch M4", "sku": "SKU-TABLET10",
        "recommended_quantity": 200,
        "recommended_supplier_id": 1, "recommended_supplier_name": "TechCorp Asia",
        "recommended_warehouse_id": 3, "recommended_warehouse_name": "Warehouse Gamma",
        "expected_cost": 150000.0, "estimated_savings": 9000.0, "savings_pct": 6.0,
        "recommended_order_date": (BASE_DATE + timedelta(days=3)).strftime("%Y-%m-%d"),
        "expected_delivery_date": (BASE_DATE + timedelta(days=15)).strftime("%Y-%m-%d"),
        "ai_reasoning": "iPad Pro at 178 units with 11.2-day runway. Education procurement season begins July 25, expect 35% velocity increase. Batch with iPhone order to save $4,200 in freight consolidation.",
        "priority": "HIGH",
    },
]

# ─── AI COPILOT RESPONSES ─────────────────────────────────────────────────────
COPILOT_RESPONSES = {
    "supplier fail": """Based on my analysis of **47 active suppliers** and current risk indicators, **Shanghai TechParts Ltd.** (SUP-0002) has the highest failure probability at **73%** for the next 7 days.

**Key Risk Factors:**
• Delivery delay increased from 3.2 → 8.7 days over 30 days (+172%)
• On-time delivery rate dropped from 84% → 67.8% (below critical threshold of 70%)
• Reliability score at 61.3 (down from 78.4 last quarter)
• Active typhoon in their primary shipping lane (South China Sea)
• 28 late shipments out of 87 total this quarter

**Secondary Risk: Vietnam Tech Supplies** (42/100 risk score)
Elevated due to tropical depression affecting their sea routes.

**Immediate Action Required:** Reduce Shanghai TechParts order allocation by 40% and redistribute to TechCorp Asia. Estimated supply continuity cost: $0. Estimated disruption cost if no action: **$890K**.""",

    "stock out": """Analyzing inventory velocity across **248 active SKUs**... I've identified **3 critical stockout risks** within 7 days:

| Product | SKU | Days Remaining | Daily Velocity | Action Required |
|---------|-----|---------------|----------------|-----------------|
| iPhone 15 Pro | SKU-IPPH15P | **5.8 days** | 43 units/day | ORDER 500 units |
| AirPods Pro 4 | SKU-AIRPD4 | **4.1 days** | 21.7 units/day | ORDER 350 units |
| RTX 4090 | SKU-RTRBRD | **3.2 days** | 13.4 units/day | ORDER 200 units |

**7 additional SKUs** will breach safety stock within 14 days if current velocity continues.

**Estimated Revenue at Risk:** $4.2M if all three stockouts occur.

Procurement recommendations have been auto-generated. Shall I create the purchase orders?""",

    "executive report": """I'll generate today's executive report. Here's the summary:

**SupplySense Executive Briefing — July 18, 2026**

**Supply Chain Health: 87/100 (STRONG)**
Overall performance is above target. Three critical items require immediate CEO attention.

**🚨 Priority Actions (Next 24 Hours):**
1. Emergency reorder: iPhone 15 Pro, AirPods Pro 4, RTX 4090 — combined revenue at risk: $4.2M
2. Typhoon Mawar: Reroute 2 shipments via Malacca Strait — cargo value: $2.34M
3. Reduce Shanghai TechParts exposure by 40%

**📊 Performance vs Last Week:**
• Inventory Health: ↑2.4% (positive trend)
• On-Time Delivery: ↑1.2% to 90.6%
• Supplier Risk: ↑3.1% (Shanghai TechParts dragging score)
• Warehouse Utilization: WH-Beta at 91.2% (CRITICAL)

**💰 Cost Optimization Opportunities: $678K identified**

Full PDF report is being generated. Download ready in 45 seconds.""",

    "warehouse": """Analyzing warehouse utilization patterns across **5 facilities**...

**Root Cause: Warehouse Beta (WH-B) is operating at 91.2% capacity**

**Why is overall utilization skewed low?**
Warehouse Delta (WH-D) is only at **58.3% utilization** — significantly underutilized.

**Contributing Factors:**
1. **Unbalanced inbound routing** — 68% of supplier shipments default to WH-Alpha and WH-Beta
2. **Slow-moving inventory** — 340 units of Dell monitors and LG appliances have been in WH-Beta for 45+ days
3. **No dynamic rebalancing** — Transfer protocols not triggered until threshold >95%

**AI Recommendations:**
• Transfer 800 units from WH-Beta to WH-Delta — reduces Beta utilization to 82.7%
• Reroute next 5 incoming shipments to WH-Delta
• Implement dynamic rebalancing trigger at 85% (currently set at 95%)
• Estimated efficiency gain: **+14.2% across network**""",

    "default": """I've analyzed your query against the current supply chain data. Based on real-time monitoring of **47 suppliers**, **128 active shipments**, and **248 SKUs**, here's what I found:

The current supply chain health score is **87/100**, with 7 critical alerts requiring attention. The most pressing issues are inventory stockouts (3 SKUs), weather disruptions (Typhoon Mawar), and supplier reliability decline (Shanghai TechParts).

Would you like me to drill down into any specific area? You can ask me about specific suppliers, products, shipments, warehouses, or ask me to generate a custom report."""
}

def get_copilot_response(query: str) -> str:
    query_lower = query.lower()
    if any(word in query_lower for word in ["supplier", "fail", "risk"]):
        return COPILOT_RESPONSES["supplier fail"]
    elif any(word in query_lower for word in ["stock", "run out", "deplete", "inventory"]):
        return COPILOT_RESPONSES["stock out"]
    elif any(word in query_lower for word in ["report", "executive", "briefing"]):
        return COPILOT_RESPONSES["executive report"]
    elif any(word in query_lower for word in ["warehouse", "utilization", "capacity"]):
        return COPILOT_RESPONSES["warehouse"]
    else:
        return COPILOT_RESPONSES["default"]

# ─── ANALYTICS ───────────────────────────────────────────────────────────────
def get_analytics_kpis():
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
    return {
        "summary": {
            "revenue_impact_saved": 2400000,
            "forecast_accuracy_pct": 91.2,
            "supplier_performance_pct": 84.7,
            "on_time_delivery_pct": 88.3,
            "inventory_turnover": 8.4,
            "cost_reduction_pct": 12.3,
        },
        "forecast_accuracy_trend": [
            {"month": m, "predicted": 100 + i * 8, "actual": 95 + i * 7, "accuracy": round(85 + i * 1.5, 1)}
            for i, m in enumerate(months)
        ],
        "cost_breakdown": [
            {"month": m, "procurement": 8200 + i * 120, "logistics": 3400 + i * 45, "storage": 1800 + i * 20, "handling": 920 + i * 10}
            for i, m in enumerate(months)
        ],
        "warehouse_utilization_trend": [
            {"month": m, "Alpha": 72 + i, "Beta": 85 + i, "Gamma": 60 + i, "Delta": 55 + i, "Epsilon": 78 + i}
            for i, m in enumerate(months)
        ],
    }


# ─── ALIASES & MISSING HELPERS ────────────────────────────────────────────────
# These are called by the API route files

def get_dashboard_data():
    """Alias for get_dashboard_overview"""
    return get_dashboard_overview()


def get_inventory_data(page: int = 1, limit: int = 50, warehouse: str = None, category: str = None, search: str = None):
    """Return paginated inventory list"""
    items = list(INVENTORY)
    if search:
        items = [i for i in items if search.lower() in str(i.get("product_id", "")).lower()]
    total = len(items)
    start = (page - 1) * limit
    return {
        "items": items[start:start + limit],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": max(1, (total + limit - 1) // limit),
    }


def get_inventory_summary():
    """Return inventory summary stats"""
    total_value = sum(i.get("current_quantity", 0) * 250 for i in INVENTORY)
    low_stock = [i for i in INVENTORY if i.get("ai_action") == "ORDER NOW"]
    return {
        "total_products": len(INVENTORY),
        "low_stock_count": len(low_stock),
        "total_value_usd": total_value,
        "avg_days_remaining": round(sum(i.get("days_remaining", 30) for i in INVENTORY) / max(len(INVENTORY), 1), 1),
        "critical_items": low_stock[:3],
    }


def get_suppliers_data(page: int = 1, limit: int = 20, search: str = None, risk_level: str = None):
    """Return suppliers list with optional filters"""
    items = list(SUPPLIERS)
    if search:
        items = [s for s in items if search.lower() in s["name"].lower() or search.lower() in s.get("country", "").lower()]
    if risk_level:
        items = [s for s in items if s.get("risk_level", "").lower() == risk_level.lower()]
    total = len(items)
    start = (page - 1) * limit
    return {
        "suppliers": items[start:start + limit],
        "total": total,
        "page": page,
        "limit": limit,
    }


def get_supplier_ai_analysis(supplier_id: int):
    """Return AI analysis for a specific supplier"""
    supplier = next((s for s in SUPPLIERS if s["id"] == supplier_id), None)
    if not supplier:
        return {"error": "Supplier not found"}
    return {
        "supplier_id": supplier_id,
        "supplier_name": supplier["name"],
        "risk_score": supplier.get("risk_score", 30),
        "reliability_score": supplier.get("reliability_score", 80),
        "ai_analysis": supplier.get("ai_explanation", "Supplier performance within acceptable parameters."),
        "recommendations": [
            f"Monitor delivery times for {supplier['name']} over next 30 days",
            "Review contract terms at next renewal",
            "Consider diversifying supply sources in this region",
        ],
        "trend": "stable",
        "generated_at": datetime.now().isoformat(),
    }


def get_shipments_data(page: int = 1, limit: int = 50, status: str = None, search: str = None):
    """Return shipments list"""
    items = list(SHIPMENTS)
    if status:
        items = [s for s in items if s.get("status", "").lower() == status.lower()]
    if search:
        items = [s for s in items if search.lower() in s.get("tracking_number", "").lower()]
    total = len(items)
    start = (page - 1) * limit
    return {
        "shipments": items[start:start + limit],
        "total": total,
        "page": page,
        "limit": limit,
        "summary": {
            "in_transit": len([s for s in SHIPMENTS if s["status"] == "in_transit"]),
            "delayed": len([s for s in SHIPMENTS if s["status"] == "delayed"]),
            "delivered": len([s for s in SHIPMENTS if s["status"] == "delivered"]),
            "on_time_pct": 81.3,
        }
    }


def get_shipment_details(shipment_id: int):
    """Return detail for a specific shipment"""
    shipment = next((s for s in SHIPMENTS if s["id"] == shipment_id), None)
    if not shipment:
        return {"error": "Shipment not found"}
    return {
        **shipment,
        "timeline": [
            {"event": "Order Placed", "timestamp": (datetime.now() - timedelta(days=14)).isoformat(), "status": "completed"},
            {"event": "Departed Origin", "timestamp": (datetime.now() - timedelta(days=10)).isoformat(), "status": "completed"},
            {"event": "In Transit", "timestamp": (datetime.now() - timedelta(days=5)).isoformat(), "status": "active"},
            {"event": "Customs Clearance", "timestamp": None, "status": "pending"},
            {"event": "Delivered", "timestamp": None, "status": "pending"},
        ],
        "weather_impact": "Moderate sea conditions detected on current route. Monitor closely.",
        "ai_eta_prediction": shipment.get("estimated_arrival", ""),
    }


def get_warehouses_data():
    """Return all warehouses"""
    return {
        "warehouses": WAREHOUSES,
        "network_summary": {
            "total_warehouses": len(WAREHOUSES),
            "avg_utilization": round(sum(w["current_utilization_pct"] for w in WAREHOUSES) / len(WAREHOUSES), 1),
            "total_capacity_sqft": sum(w["total_capacity_sqft"] for w in WAREHOUSES),
            "critical_warehouses": len([w for w in WAREHOUSES if w["current_utilization_pct"] > 85]),
        }
    }


def get_warehouse_heatmap(warehouse_id: int):
    """Return heatmap data for a warehouse"""
    warehouse = next((w for w in WAREHOUSES if w["id"] == warehouse_id), WAREHOUSES[0])
    zones = []
    for row in range(6):
        for col in range(8):
            occupancy = round(random.uniform(20, 98), 1)
            zones.append({
                "row": row, "col": col,
                "zone_id": f"Z{row+1}{col+1:02d}",
                "occupancy_pct": occupancy,
                "status": "critical" if occupancy > 90 else "warning" if occupancy > 75 else "ok",
                "sku_count": random.randint(5, 45),
            })
    return {
        "warehouse_id": warehouse_id,
        "warehouse_name": warehouse["name"],
        "zones": zones,
        "heatmap_rows": 6,
        "heatmap_cols": 8,
        "avg_occupancy": warehouse["current_utilization_pct"],
    }


def get_demand_forecast(product_id: int = 1, days: int = 30):
    """Alias for generate_demand_forecast"""
    return generate_demand_forecast(product_id=product_id, days=days)


def get_risk_events(page: int = 1, limit: int = 20):
    """Return paginated risk events"""
    total = len(RISK_EVENTS)
    start = (page - 1) * limit
    return {
        "events": RISK_EVENTS[start:start + limit],
        "total": total,
        "critical_count": len([r for r in RISK_EVENTS if r["risk_level"] == "critical"]),
        "high_count": len([r for r in RISK_EVENTS if r["risk_level"] == "high"]),
        "medium_count": len([r for r in RISK_EVENTS if r["risk_level"] == "medium"]),
    }


def get_risk_score():
    """Return overall risk score"""
    return {
        "overall_score": 34,
        "level": "MODERATE",
        "trend": "stable",
        "components": {
            "supplier_risk": 38,
            "logistics_risk": 42,
            "weather_risk": 61,
            "geopolitical_risk": 28,
            "demand_risk": 22,
            "financial_risk": 18,
        },
        "last_updated": datetime.now().isoformat(),
    }


def get_procurement_recommendations():
    """Return all procurement recommendations"""
    return {
        "recommendations": PROCUREMENT_RECOMMENDATIONS,
        "total": len(PROCUREMENT_RECOMMENDATIONS),
        "total_value_usd": sum(r["expected_cost"] for r in PROCUREMENT_RECOMMENDATIONS),
        "total_savings_usd": sum(r["estimated_savings"] for r in PROCUREMENT_RECOMMENDATIONS),
        "critical_count": len([r for r in PROCUREMENT_RECOMMENDATIONS if r["priority"] == "CRITICAL"]),
    }


def get_copilot_history():
    """Return sample copilot conversation history"""
    return {
        "history": [
            {
                "id": 1,
                "role": "user",
                "content": "Which suppliers are most at risk this week?",
                "timestamp": (datetime.now() - timedelta(hours=2)).isoformat(),
            },
            {
                "id": 2,
                "role": "assistant",
                "content": get_copilot_response("supplier risk"),
                "timestamp": (datetime.now() - timedelta(hours=2)).isoformat(),
            },
            {
                "id": 3,
                "role": "user",
                "content": "What products will run out of stock?",
                "timestamp": (datetime.now() - timedelta(hours=1)).isoformat(),
            },
            {
                "id": 4,
                "role": "assistant",
                "content": get_copilot_response("stock out inventory"),
                "timestamp": (datetime.now() - timedelta(hours=1)).isoformat(),
            },
        ],
        "total": 4,
    }


def get_alerts(page: int = 1, limit: int = 20, unread_only: bool = False):
    """Return notification alerts"""
    alerts = [
        {"id": 1, "type": "inventory", "severity": "critical", "title": "iPhone 15 Pro stock critical", "message": "Only 5.8 days of stock remaining. Immediate reorder required.", "is_read": False, "created_at": (datetime.now() - timedelta(minutes=15)).isoformat()},
        {"id": 2, "type": "shipment", "severity": "high", "title": "Shipment SS-2024-0848 delayed", "message": "Typhoon Mawar on current route. Delay estimated 3-5 days. $1.56M cargo at risk.", "is_read": False, "created_at": (datetime.now() - timedelta(minutes=42)).isoformat()},
        {"id": 3, "type": "supplier", "severity": "high", "title": "Shanghai TechParts risk elevated", "message": "Risk score jumped from 42 to 78.5. Delivery performance declined 25% over past 30 days.", "is_read": False, "created_at": (datetime.now() - timedelta(hours=2)).isoformat()},
        {"id": 4, "type": "risk", "severity": "high", "title": "Rotterdam port strike July 22-28", "message": "Longshoreman strike confirmed. 3 shipments affected. Pre-position buffer stock recommended.", "is_read": True, "created_at": (datetime.now() - timedelta(hours=4)).isoformat()},
        {"id": 5, "type": "inventory", "severity": "medium", "title": "AirPods Pro 4 low stock", "message": "4.1 days remaining. Order 350 units from TechCorp Asia.", "is_read": True, "created_at": (datetime.now() - timedelta(hours=6)).isoformat()},
        {"id": 6, "type": "demand", "severity": "medium", "title": "Festival demand spike detected", "message": "AI predicts +45% demand surge for electronics July 18-22. Pre-positioning recommended.", "is_read": True, "created_at": (datetime.now() - timedelta(hours=8)).isoformat()},
        {"id": 7, "type": "risk", "severity": "medium", "title": "Bangladesh factory flooding", "message": "1 Tier-2 supplier impacted. Secondary sourcing activated. Monitor closely.", "is_read": True, "created_at": (datetime.now() - timedelta(hours=12)).isoformat()},
    ]
    if unread_only:
        alerts = [a for a in alerts if not a["is_read"]]
    total = len(alerts)
    start = (page - 1) * limit
    return {
        "alerts": alerts[start:start + limit],
        "total": total,
        "unread_count": len([a for a in alerts if not a["is_read"]]),
        "page": page,
        "limit": limit,
    }


def get_analytics_supplier_performance():
    """Return supplier performance analytics"""
    return {
        "suppliers": [
            {"name": s["name"][:15], "reliability": s["reliability_score"], "on_time": s["on_time_delivery_pct"], "risk": s["risk_score"]}
            for s in SUPPLIERS[:8]
        ],
        "avg_reliability": round(sum(s["reliability_score"] for s in SUPPLIERS) / len(SUPPLIERS), 1),
        "avg_on_time": round(sum(s["on_time_delivery_pct"] for s in SUPPLIERS) / len(SUPPLIERS), 1),
        "at_risk_count": len([s for s in SUPPLIERS if s["risk_score"] > 50]),
    }


def get_analytics_forecast_accuracy():
    """Return forecast accuracy analytics"""
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
    return {
        "accuracy_trend": [
            {"month": m, "accuracy": round(82 + i * 1.5 + random.uniform(-1, 1), 1), "mape": round(8 - i * 0.5, 1)}
            for i, m in enumerate(months)
        ],
        "current_accuracy": 91.2,
        "current_mape": 8.8,
        "best_performing_category": "Electronics",
        "worst_performing_category": "Apparel",
    }

