
const currency_formatter=new Intl.NumberFormat("en-US",{
    currency:"BDT",style:"currency" })
 export const formatCurrency=(amount:number)=>{
     return currency_formatter.format(amount)
     
 }