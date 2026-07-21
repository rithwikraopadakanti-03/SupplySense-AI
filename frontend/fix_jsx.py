import sys

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The subagent mistakenly escaped all template literal strings in JSX
    # E.g. className={\`flex \${variable}\`} instead of className={`flex ${variable}`}
    
    content = content.replace('{\\`', '{`')
    content = content.replace('\\`}', '`}')
    content = content.replace('\\${', '${')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    fix_file('app/(dashboard)/copilot/page.tsx')
