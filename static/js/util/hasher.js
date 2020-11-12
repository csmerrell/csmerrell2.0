export let hashSkillArray = function(skillArr) {
    let hashedSkills = {};
    skillArr.reduce((obj, skill) => {
        obj[hashString(skill.shorthand)] = skill;
        return obj
    }, hashedSkills);

    return hashedSkills;
}

export let hashKeywordMap = function(hashedSkillMap) {
    for(let hash in hashedSkillMap) {
        let map = {}
        hashedSkillMap[hash].keywords.reduce((map, word) => {
            map[hashString(word)] = word;
            return map
        }, map);
        hashedSkillMap[hash].keywordMap = map;
    }
}

export let hashString = function(s){
    s = s.toLowerCase();
    return s.split("").reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);            
}
