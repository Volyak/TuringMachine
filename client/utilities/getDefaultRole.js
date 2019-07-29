import groups from '../const/groups'
import rights from '../const/rights'

export default () => {
    let role = {
        name: '',
        groups: Object.keys(groups).map(group => {
            return {
                name: groups[group],
                rights: Object.keys(rights).map(right => {
                    return {
                        name: rights[right],
                        priority: 0
                    }})
            }
        })
    };

    return role;
}