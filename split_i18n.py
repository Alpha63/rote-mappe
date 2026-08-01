import re
import os

with open('src/i18n.ts', 'r', encoding='utf-8') as f:
    content = f.read()

de_start = content.find('  de: {\n')
en_start = content.find('  en: {\n')
end_idx = content.find('};\n\ni18n')

de_content = content[de_start:en_start].strip().rstrip(',')
en_content = content[en_start:end_idx].strip()

# de_content starts with `de: {`
de_file = "export const de = {\n" + de_content[4:] + ";\n"
en_file = "export const en = {\n" + en_content[4:] + ";\n"

os.makedirs('src/locales', exist_ok=True)
with open('src/locales/de.ts', 'w', encoding='utf-8') as f:
    f.write(de_file)
with open('src/locales/en.ts', 'w', encoding='utf-8') as f:
    f.write(en_file)

print("Split successful")
