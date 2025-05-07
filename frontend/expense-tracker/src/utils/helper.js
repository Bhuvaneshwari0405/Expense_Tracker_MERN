export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};
export const getInitials = (name) => {
    if(!name) return "";
    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i].charAt(0).toUpperCase();
    }
    return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if (num === null || isNaN(num)) return "0";
   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
   return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};
