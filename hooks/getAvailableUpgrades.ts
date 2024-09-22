
function getAvailableUpgrades(user: any, upgrades: any) {
    const availableUpgrades= []

    for(const upgrade of upgrades){
        let isFind = false
        for(const u of user.upgrades){
            if(u.id === upgrade.id){
                console.log(u)
                console.log(upgrade)
                availableUpgrades.push({
                    id: upgrade.id,
                    level:upgrade.levels[u.level.lvl]
                })
                console.log({
                    id: upgrade.id,
                    level:upgrade.levels[u.level.lvl]
                })
                isFind = true
            }
        }
        if(!isFind){
            console.log({
                id: upgrade.id,
                level:upgrade.levels[0]
            })
            availableUpgrades.push({
                id: upgrade.id,
                level:upgrade.levels[0]
            })
        }

    }
    return availableUpgrades
}

export default getAvailableUpgrades
