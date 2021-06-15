export function foo() {
    console.log("module 1 foo()");
}

export function bar() {
    console.log("module bar()");
    console.log(Date.now());
    console.log(1);
}



export const DATA_ARR = [1, 2, 3, 4, 5];