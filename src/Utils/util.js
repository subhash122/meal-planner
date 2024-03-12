export const modifiedMeals=(meals)=>{
    let result=[];
    result=meals.map((el)=>{
        let obj={
            mealid:el.id,
            title: el.name,
            description:el.description,
            imageurl:el.imageurl,
            start: new Date(el.date),
            end:new Date(el.date),
        }
        return obj;
    })
    return result;
}