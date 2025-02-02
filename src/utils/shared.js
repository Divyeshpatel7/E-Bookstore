import { Role, RoutePaths } from "./enum";
import cartService from "../services/cart.service";
const AddToCart = async (book, id) => {
    return cartService
        .add({
            userId: id,
            bookId: book.id,
            quantity: 1,
        })
        .then((res) => {
            return { error: false, message: "Item added in cart" };
        })
        .catch((e) => {
            if (e.status === 500)
            return { error: true, message: "Item already in the cart" };
            else return { error: true, message: "something went wrong" };
        });
};

const LocalStorageKeys = {
    USER:"user",
}

const NavigationItems = [
    {
        name: "User",
        route: RoutePaths.User,
        access: [Role.Admin]
    },
    {
        name: "Categories",
        route: RoutePaths.Category,
        access: [Role.Admin, Role.Seller]
    },
    {
        name: "Books",
        route: RoutePaths.BookDetails,
        access: [Role.Admin, Role.Seller]
    },
    {
        name: "Update Profile",
        route: RoutePaths.UpdateProfile,
        access: [Role.Admin, Role.Buyer, Role.Seller]
    },
    {
        name: "Book Listing",
        route: RoutePaths.BookListing,
        access: [Role.Admin, Role.Buyer, Role.Seller]
    },  
];

const hasAccess = (pathname, user) => {
    const navItem = NavigationItems.find((navItem) => 
        pathname.includes(navItem.route)
    );
    if(navItem){
        return(
            !navItem.access || 
            !!(navItem.access && navItem.access.includes(user.roleId))
        );
    }
    return true;
}

export { 
    NavigationItems,  
    LocalStorageKeys,
    hasAccess,
    AddToCart
}

