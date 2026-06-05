const retries: number = 5;  
// What does VS Code show? 
// Type 'string' is not assignable to type 'number'.ts(2322)

const user = { email: "john@test.com" };
//console.log(user.password);      
// What does VS Code show? 
//Property 'password' does not exist on type '{ email: string; }'.ts(2339)


function getTimeout(seconds: number): string {
  return String(seconds * 1000);  // Hint: look at the return type
}

const config = { baseURL: "https://staging.example.com" };
console.log(config.baseURL);  // Hint: case matters

function printName(name: string) {
  console.log(name);
}
const userName: string | undefined = undefined;
if (userName){
    printName(userName);  // Hint: what if userName is undefined?
}


type Product = {
    name: string;
    price: number;
    inStock: boolean
}

const productA: Product = {
    name: "iPhone 13 Pro Max",
    price: 999,
    inStock: true
} 

const productB: Product = {
    name: "Samsung Galaxy S22",
    price: 899,  // Hint: price should be a number, not a string
    inStock: false
}

//helper function to format price as a string with a dollar sign and two decimal places
function formatPrice(price: number): string {

    return `$${price.toFixed(2)}`;
}

console.log (`The price of ${productA.name} is ${formatPrice(productA.price)}`);
console.log (`The price of ${productB.name} is ${formatPrice(productB.price)}`);
console.log (`The total price of ${productA.name} & ${productB.name} is ${formatPrice(productB.price+productA.price)}`);
