const parseType=(contactType)=>{
    
    if(typeof contactType!=="string") return;
    const isContactType=(contactType)=>['work', 'home', 'personal'].includes(contactType);
    if (isContactType(contactType))return contactType;
}
const parseIsFavorite=(isFavorite)=>{
    if(typeof isFavorite!=="string") return;
    const isFavoriteContact=(isFavorite)=>['true','false'].includes(isFavorite);
    if (!isFavoriteContact) return;
    return isFavorite==="true";
}


export const parseContactFilterParams=(query)=>{
    const {contactType, isFavorite}=query;

    const parsedType=parseType(contactType);
    const parsedIsFavorite=parseIsFavorite(isFavorite);

    return{
        type:parsedType,
        favorite:parsedIsFavorite,
    }

}