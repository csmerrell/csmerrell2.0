export let mapSkillArray = function(skillArr) {
    let mappedSkills = {};
    skillArr.reduce((obj, skill) => {
        obj[skill.shorthand] = skill;
        return obj
    }, mappedSkills);

    return mappedSkills;
}

export let mapSkillKeywords = function(skillMap) {
    for(let key in skillMap) {
        let map = {}
        skillMap[key].keywords.reduce((map, word) => {
            map[word] = word;
            return map
        }, map);
        skillMap[key].keywordMap = map;
    }
}