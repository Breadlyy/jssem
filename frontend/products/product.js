//product's catalog
const CATALOG =
[
    {
        id: 'el1',
        name: 'intel core i5 10400f &#10054',
        audio: '',
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.ultraconfig.com%2Fwp-content%2Fuploads%2F2021%2F01%2Fi5-10400f.png&f=1&nofb=1&ipt=a7da9f8695e85b9c469dea8188881b4145d60588b7777222ffef7446f566dc6b&ipo=images',
        price: '120'
    },
    {
        id: 'el2',
        name: 'Gigabyte B550M AORUS',
        audio: '',
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fchip52.ru%2Fimage%2Fcache%2Fcatalog%2Fproducts%2Fkomplektuyuschie%2Fkomplektuyuschie-dlya-pk%2Fmaterinskie-platyi%2F1403105_v02_b-800x800.jpg&f=1&nofb=1&ipt=77c0909ec0bd043d2c6dfee9f22f456973f903d6a36f702fcd83fb788ffada5d&ipo=images',
        price: '80'
    },
    {
        id: 'el3',
        name: 'rtx 2070',
        audio: '',
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.profesionalreview.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fgigabyte-rtx-2070-super-windforce.jpg&f=1&nofb=1&ipt=db6f4cbe4cdd56f9e00a378865eb6bf49a72f36fda339d47b41d9833bc1b1aa3&ipo=images',
        price: '300'
    },
    {
        id: 'el4',
        name: 'gtx 1650',
        audio: '',
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.OM5wGCmwzd8KLMkDJBkJuwHaE6%26pid%3DApi&f=1&ipt=ed3e5f6cac109b892ea793f25cc83c2fbce1ab42246f781990d32ca54a146e43&ipo=images',
        price: '120'
    },
    {
        id: 'el5',
        name: 'B350M',
        audio: '',
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcompnovosti.ru%2Fwp-content%2Fuploads%2F2017%2F06%2FMSI-B350M-A320M-Pro-VD.jpg&f=1&nofb=1&ipt=2f36764757bf997c997fb2e0d3ff5557abc67b786b53ffd3f2327b1f0ca7014b&ipo=images',
        price: '120'
    },
    {
        id: 'el6',
        name: 'gtx 1650 super',
        audio: '',
        img: 'https://www.cobrashop.ps/wp-content/uploads/2020/07/1650-super-gaming-x-02.png',
        price: '120'
    },
    {
        id: 'el7',
        name: 'KPT-8',
        audio: '',
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fradioizba.ru%2Fcat%2FPIC%2F329N0887513.jpg&f=1&nofb=1&ipt=0400fed505da4d2825b69f2566191415546bd238010c185783125f14b2b79ea7&ipo=images',
        price: '2'
    },
    {
        id: 'el8',
        name: 'DEXP DC-102B',
        audio: '',
        img: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/65b8543a6800f87fe0e9dfd83161b79f/0a87c68e5b180e18f25cfae15f937d4d3af60cf47518a5b40603cba52e68e6c2.jpg.webp',
        price: '35'
    },
    {
        id: 'el9',
        name: 'Intel Core i3-10100 OEM',
        audio: '',
        img: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/d64e39e88b40c6b4318282f6d2d9c99d/3c4df9fde9351af07709810e671714c29efdef66675cad405d47ecfcddfcfe6f.jpg.webp',
        price: '100'
    },
    {
        id: 'el10',
        name: 'Monitor Samsung CF39',
        audio: '',
        img: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/49f492db96e225f1e749a5d4feded68e/12ba63b25f22b5b8d0c351cff0c49410deb0140e6d74a32546cf9fae052d86f7.jpg.webp',
        price: '120'
    },
    {
        id: 'el11',
        name: 'Samsung 980 pro m2',
        audio: '',
        img: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/93b6d036f63e4c65dfeb193c6ca78623/e10159069d1e334d814953ee3fbb8476c84e520c8c80d26bfeaa62ce85ca4b54.jpg.webp',
        price: '150'
    },
    {
        id: 'el12',
        name: 'Kingston FURY 16Gb 3600',
        audio: '',
        img: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/4f9090fdfd5e83343a4dd57ac6e60e45/4fb1dec6375de4d3db5308ef8e60a9f77d3b9249d9b7e102809c5cc6c15e0090.jpg.webp',
        price: '72'
    },
]
const ROOT_PRODUCTS = document.getElementById('products');

class Product
{

    render()
    {
       
        //adding all products on the product's page
        let htmlCatalog = '';
        CATALOG.forEach(({id, name, price, img, audio}) =>
        {
           
            htmlCatalog += `
            <li class="products_element">
                <span class="products_element__name">${name}</span>
                <img class="products_element__img" src="${img}"/>
                <span class="products_element__price">${price}$</span> 
            
            `;
            var token = localStorage.getItem('jwtToken');
            var isAuthenticated = token !== null && token !== undefined && token !== '';
            if (isAuthenticated)
            {
                htmlCatalog +=  `<br>
                <button class="products_element__btn" data_id="${id}" onClick="addToCart()">Add to cart</button>
            </li>`
            }
            
        });
        const html = `
        <ul class="products_container">
            ${htmlCatalog}
        </ul>
        `;
        ROOT_PRODUCTS.innerHTML = html;
    }
   
}


const productsPage = new Product();
productsPage.render();
let cartItems = [];
//adding the product to the cart after clicking on "add to cart"
function addToCart()
{
    const button = event.target;
    const product = button.parentElement;
    const productId = event.target.getAttribute('data-id');
    const name = product.querySelector('.products_element__name').textContent;
    const img = product.querySelector('.products_element__img').getAttribute('src');
    const price = product.querySelector('.products_element__price').textContent;
  
    const item = {
        id: productId,
        name: name,
        img: img,
        price: price
      };
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      // Add new product to a cart
      cartItems.push(item);

      // Saving updated list of products to the cart's localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
