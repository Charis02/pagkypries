import json

MIN_YEAR = 2019
MAX_YEAR = 2022

for year in range(MIN_YEAR,MAX_YEAR+1):
    result = {}

    with open('./data/' + year + '/raw_bases_data.json') as f:
        data = json.load(f)

        for code in data:
            area = data[code][0]
            grade = data[code][1]
            
            if grade == '--':
                continue

            result[area] = min(result.get(area, 20), float(grade))

    with open('./data/' + year + '/bases_data.json', 'w') as f:
        json.dump(result, f, indent=4,ensure_ascii=False)