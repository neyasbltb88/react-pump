const compose = (...funcs) => (Comp) => {
    return funcs.reduceRight((prevRes, fun) => fun(prevRes), Comp);
}

export default compose;