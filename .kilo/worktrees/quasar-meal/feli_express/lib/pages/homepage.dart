import 'package:feli_express/functions/Apis/product.api.dart';
import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/pages/cart.screen.dart';
import 'package:feli_express/pages/order.screen.dart';
import 'package:feli_express/pages/productpage.dart';
import 'package:feli_express/pages/userprofile.dart';
import 'package:feli_express/pages/wishlist.page.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/state-management/product.provider.dart';
import 'package:feli_express/services/state-management/wishlist.provider.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/PopupMenu.dart';
import 'package:feli_express/widgets/SideBarMenu.dart';
import 'package:feli_express/widgets/new_arrival.dart';
import 'package:feli_express/widgets/pagecontroler.dart';
import 'package:feli_express/widgets/productCard.dart';
import 'package:feli_express/widgets/productdialogue.dart';
import 'package:feli_express/widgets/searchbar.dart';
import 'package:flutter/material.dart';
import 'package:path/path.dart';
import 'package:provider/provider.dart';

class MyhomePage extends StatefulWidget {
  const MyhomePage({Key? key}) : super(key: key);

  @override
  State<MyhomePage> createState() => _MyhomePageState();
}

class _MyhomePageState extends State<MyhomePage>
    with SingleTickerProviderStateMixin {
  LocalStorageService localStorageService = LocalStorageService();
  var selectedindex = 0;
  final searchinput = TextEditingController();
  var futureproduct = ProductController();
  late AnimationController controller;
  late Animation<double> scaleAnimation;
  String searchText = '';
  List<Product> products = [];
  // final searchController = TextEditingController();
  late TextEditingController _searchController;
  // products to pass on search
  List<Product> filteredProducts = [];

  // handle sidebar menu filters

  late String selectedProductClassId = 'All';
  late String selectedProductClassName = 'All';
  late String selectedCategoryName = 'All';
  late String selectedSubCategoryId = 'All';
  late String selectedSubCategoryName = 'All';
  late String selectedBrandName = 'All';
  late String selectedBrandId = 'All';
  late String selectedCategoryId = 'All';

  late dynamic user = {};

  @override
  void initState() {
    super.initState();
    // futureproduct.getProduct();
    // user = {};
    localStorageService.getUserData().then((value) {
      print("user on homepag  $value");
      setState(() {
        // user = value;
        user = value ?? {};
        print("user on homepag  $user");
      });
    });

    controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this as TickerProvider,
    );

    scaleAnimation = CurvedAnimation(
      parent: controller,
      curve: Curves.easeIn,
    );

    _searchController = TextEditingController();
  }

  @override
  void dispose() {
    super.dispose();
    _searchController.dispose();
  }

  settext() {
    setState(() {
      searchText = searchinput.text;
    });
  }

  List<String> searchResults = [];
  void onQueryChange(String query) {
    setState(() {
      searchResults = products
          .where((product) =>
              product.name.toLowerCase().contains(query.toLowerCase()))
          .map((product) => product.name)
          .toList();
    });
  }

  void _updateSelection(
    String? productClassId,
    String? productClassName,
    String? categoryId,
    String? categoryName,
    String? subCategoryId,
    String? subCategoryName,
    String? brandId,
    String? brandName,
  ) {
    setState(() {
      selectedindex = 2;

      selectedProductClassId = productClassId != null ? productClassId : 'All';
      selectedProductClassName =
          productClassName != null ? productClassName : 'All';
      selectedCategoryName = categoryName != null ? categoryName : 'All';
      selectedSubCategoryId = subCategoryId != null ? subCategoryId : 'All';
      selectedSubCategoryName =
          subCategoryName != null ? subCategoryName : 'All';
      selectedBrandName = brandName != null ? brandName : 'All';
      selectedBrandId = brandId != null ? brandId : 'All';

      selectedCategoryId = categoryId != null ? categoryId : 'All';
    });
  }

  @override
  Widget build(BuildContext context) {
    // print("user on homepag   ${user['email']} ${user}");
    var screenSize = MediaQuery.of(context).size;
    double imageWidth =
        MediaQuery.of(context).orientation == Orientation.portrait
            ? screenSize.width
            : screenSize.width;
    String? _validateSearch(String? value) {
      if (value!.isEmpty) {
        return 'Please enter a search term';
      }
      return null;
    }

    print(
        "onselectionclick  selectedindex$selectedProductClassId $selectedProductClassName");

    // get all products

    final product = futureproduct.getProduct().then((value) {
      return value;
    });
    final product2 = context.watch<ProductProvider>().products;

    return Scaffold(
      drawer: selectedindex == 0
          ? SideBarMenu(
              selectedProductClassId: selectedProductClassId,
              selectedProductClassName: selectedProductClassName,
              selectedCategoryId: selectedCategoryId,
              selectedCategoryName: selectedCategoryName,
              selectedSubCategoryId: selectedSubCategoryId,
              selectedSubCategoryName: selectedSubCategoryName,
              selectedBrandId: selectedBrandId,
              selectedBrandName: selectedBrandName,
              onSelectionChanged: _updateSelection,
            )
          : null,
      //endDrawer: MyPopupMenu(context),
      backgroundColor: AppColors.AppColor,
      appBar: selectedindex != 3
          ? AppBar(
              backgroundColor: AppColors.AppColor,
              leadingWidth: 32,
              leading: selectedindex == 2
                  ? IconButton(
                      icon: const Icon(Icons.arrow_back_ios),
                      onPressed: () {
                        setState(() {
                          selectedindex = 0;
                        });
                      })
                  : null,
              title: SearchBarWidget(
                product2: product2,
              ),
              titleSpacing: 8,
              actions: [
                Stack(children: [
                  CircleAvatar(
                    backgroundColor: AppColors.AppColor,
                    radius: 17,
                    child: IconButton(
                      iconSize: 18,
                      icon: Icon(
                        Icons.favorite_border,
                        color: context
                                .watch<WishlistProvider>()
                                .wishlist
                                .isNotEmpty
                            ? AppColors.errorcolor
                            : AppColors.primarytextColor,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const WishlistPage(),
                          ),
                        );
                      },
                    ),
                  ),
                  Positioned(
                    right: 0,
                    top: 0,
                    child: Container(
                      padding: const EdgeInsets.all(1),
                      decoration: BoxDecoration(
                        color: AppColors.errorcolor,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      constraints: const BoxConstraints(
                        minWidth: 12,
                        minHeight: 12,
                      ),
                      child: Text(
                        '${context.watch<WishlistProvider>().wishlist.length}',
                        style: const TextStyle(
                          color: AppColors.textcolor,
                          fontSize: 10,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  )
                ]),
                MyPopupMenuButton(context, user),
              ],
            )
          : null,
      body: selectedindex == 0
          ? SingleChildScrollView(
              child: Builder(
                  builder: (context) => Center(
                        child: Container(
                          color: AppColors.AppColor,
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                selectedindex == 0
                                    ? Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Stack(children: [
                                            Container(
                                              height: 250,
                                              width: imageWidth,
                                              decoration: BoxDecoration(
                                                color: AppColors.AppColor,
                                                borderRadius:
                                                    BorderRadius.circular(20),
                                                boxShadow: [
                                                  BoxShadow(
                                                      color: AppColors
                                                          .primarytextColor
                                                          .withOpacity(0.1),
                                                      blurRadius: 5,
                                                      spreadRadius: 3,
                                                      offset: Offset(0, 1))
                                                ],
                                              ),
                                              child: MyAutomaticScrolling(
                                                products: product,
                                              ),
                                            ),
                                            filteredProducts.isEmpty
                                                ? const Positioned(
                                                    right: 20,
                                                    bottom: 20,
                                                    child: Column(
                                                      children: [
                                                        Text(
                                                          "Shop with us",
                                                          style: TextStyle(
                                                              color: AppColors
                                                                  .textcolor,
                                                              fontSize:
                                                                  20, //fontWeight: FontWeight.bold,
                                                              fontStyle:
                                                                  FontStyle
                                                                      .italic),
                                                        ),
                                                        Text(
                                                          "SPECIAL",
                                                          style: TextStyle(
                                                            color: AppColors
                                                                .primaryColor,
                                                            fontSize:
                                                                40, // fontWeight: FontWeight.bold,
                                                          ),
                                                        ),
                                                        Text(
                                                          "SALE",
                                                          style: TextStyle(
                                                            color: AppColors
                                                                .textcolor,
                                                            fontSize:
                                                                30, //fontWeight: FontWeight.bold,
                                                            //fontStyle: FontStyle.italic
                                                          ),
                                                        ),
                                                        SizedBox(
                                                          height: 50,
                                                        )
                                                      ],
                                                    ))
                                                : Container(
                                                    margin: EdgeInsets.all(8.0),
                                                    height: MediaQuery.sizeOf(
                                                            context)
                                                        .height,
                                                    decoration: BoxDecoration(
                                                        color:
                                                            AppColors.AppColor,
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(20)),
                                                    child: ListView.builder(
                                                        itemCount:
                                                            filteredProducts
                                                                .length,
                                                        itemBuilder:
                                                            (context, index) {
                                                          Product product =
                                                              filteredProducts[
                                                                  index];
                                                          return ListTile(
                                                            title: Text(
                                                                product.name),
                                                            // Add more details about the product as needed...
                                                          );
                                                        }))
                                          ]),
                                          const SizedBox(height: 20),
                                          const Row(
                                            children: [
                                              Text(
                                                '  New arrivals',
                                                style: TextStyle(
                                                    color: AppColors
                                                        .primarytextColor,
                                                    fontSize: 18,
                                                    fontWeight:
                                                        FontWeight.bold),
                                              ),
                                              SizedBox(
                                                width: 20,
                                              ),
                                              Icon(
                                                Icons.arrow_forward,
                                                color:
                                                    AppColors.primarytextColor,
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 10),
                                          // product2.isEmpty
                                          //     ? const Center(
                                          //         child:
                                          //             CircularProgressIndicator(
                                          //           color:
                                          //               AppColors.primaryColor,
                                          //         ),
                                          //       )
                                          //     : NewArrivalProducts(
                                          //         context, product2),
                                          const SizedBox(height: 20),
                                          const Text('  Our products',
                                              style: TextStyle(
                                                  fontSize: 18,
                                                  color: AppColors
                                                      .primarytextColor,
                                                  fontWeight: FontWeight.bold)),
                                          product2.isNotEmpty
                                              ? Wrap(
                                                  spacing:
                                                      5, // horizontal space between cards
                                                  runSpacing:
                                                      5, // vertical space between lines
                                                  children:
                                                      List<Widget>.generate(
                                                          product2.length,
                                                          (index) {
                                                    Product product =
                                                        product2[index];
                                                    return GestureDetector(
                                                      onTap: () {
                                                        MyProductDialogue(
                                                            context, product);
                                                      },
                                                      child: productCard(
                                                          context, product),
                                                    );
                                                  }),
                                                )
                                              : Container(),

                                          // GridView.builder(
                                          //   gridDelegate:
                                          //       SliverGridDelegateWithFixedCrossAxisCount(
                                          //     crossAxisCount:
                                          //         MediaQuery.of(context)
                                          //                     .size
                                          //                     .width >
                                          //                 600
                                          //             ? 4
                                          //             : MediaQuery.of(context)
                                          //                         .size
                                          //                         .width >
                                          //                     450
                                          //                 ? 3
                                          //                 : 2,
                                          //     childAspectRatio: 0.7,
                                          //     mainAxisSpacing: 10,
                                          //     // crossAxisSpacing: 10,
                                          //     // mainAxisExtent: double.infinity,
                                          //     // crossAxisSpacing: 16,
                                          //     // mainAxisSpacing: 16,
                                          //   ),
                                          //   itemCount: product2.length,
                                          //   shrinkWrap: true,
                                          //   physics:
                                          //       const NeverScrollableScrollPhysics(),
                                          //   itemBuilder: (context, index) {
                                          //     Product product =
                                          //         product2[index];
                                          //     if (index + 1 <
                                          //         product2.length) {
                                          //       return Row(
                                          //         mainAxisAlignment:
                                          //             MainAxisAlignment
                                          //                 .spaceBetween,
                                          //         children: [
                                          //           Expanded(
                                          //             child: GestureDetector(
                                          //               onTap: () {
                                          //                 MyProductDialogue(
                                          //                     context,
                                          //                     product);
                                          //               },
                                          //               child: productCard(
                                          //                   context, product),
                                          //             ),
                                          //           ),
                                          //           SizedBox(width: 10),
                                          //         ],
                                          //       );
                                          //     } else if (index <
                                          //             product2.length &&
                                          //         product2.length == 1) {
                                          //       return Row(
                                          //         mainAxisAlignment:
                                          //             MainAxisAlignment
                                          //                 .spaceBetween,
                                          //         children: [
                                          //           productCard(
                                          //               context, product),
                                          //           SizedBox(width: 10),
                                          //         ],
                                          //       );
                                          //     } else {
                                          //       return Container();
                                          //     }
                                          //   },
                                          // ),
                                          // const SizedBox(height: 20),
                                        ],
                                      )
                                    : Container(),
                              ],
                            ),
                          ),
                        ),
                      )),
            )
          : selectedindex == 2
              ? ProductPage(
                  selectedProductClassId: selectedProductClassId,
                  selectedProductClassName: selectedProductClassName,
                  selectedCategoryId: selectedCategoryId,
                  selectedCategoryName: selectedCategoryName,
                  selectedSubCategoryId: selectedSubCategoryId,
                  selectedSubCategoryName: selectedSubCategoryName,
                  selectedBrandId: selectedBrandId,
                  selectedBrandName: selectedBrandName,
                )
              : selectedindex == 3
                  ? UserProfilePage(user: user)
                  : Container(),

      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: AppColors.primaryColor,
        unselectedItemColor: AppColors.primarytextColor,
        showUnselectedLabels: true,
        currentIndex: selectedindex,
        onTap: (value) {
          setState(() {
            selectedindex = value;
          });

          switch (value) {
            case 0: // Home
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const MyhomePage()),
              );
              break;
            case 1: // Cart
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                    builder: (context) => const CartPage(user: {})),
              );
              break;
            case 2: // Shop
              // Handle shop navigation
              break;
            case 3: // Profile
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                    builder: (context) => UserProfilePage(user: user)),
              );
              break;
            case 4: // Orders
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => OrdersPage(user: user)),
              );
              break;
          }
        },
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          // BottomNavigationBarItem(
          //   icon: Icon(Icons.shopping_cart),
          //   label: 'Cart',
          // ),
          BottomNavigationBarItem(
            icon: GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const CartPage(
                        user: {},
                      ),
                    ),
                  );
                },
                child: Stack(children: [
                  const CircleAvatar(
                    child: Icon(
                      Icons.shopping_cart,
                      color: AppColors.primarytextColor,
                    ),
                  ),
                  Positioned(
                      right: 0,
                      child: Container(
                        padding: const EdgeInsets.all(1),
                        decoration: BoxDecoration(
                          color: AppColors.errorcolor,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        constraints: const BoxConstraints(
                          minWidth: 12,
                          minHeight: 12,
                        ),
                        child: Text(
                          '${context.watch<CartProvider>().cartItems.length}',
                          style: const TextStyle(
                            color: AppColors.textcolor,
                            fontSize: 10,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ))
                ])),
            label: 'Cart',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.apps_outlined),
            label: 'Shop',
          ),
          if (user['email'] != null) ...[
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'Profile',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.file_copy_outlined),
              label: 'Orders',
            ),
          ]
        ],
      ),

      // bottomNavigationBar: BottomNavigationBar(
      //   selectedItemColor: AppColors.primaryColor,
      //   unselectedItemColor: AppColors.primarytextColor,
      //   showUnselectedLabels: true,
      //   currentIndex: selectedindex,
      //   onTap: (value) {
      //     print("ProductPage 1 $value");
      //     setState(() {
      //       selectedindex = value;
      //     });

      //     switch (value) {
      //       case 1:
      //         Navigator.push(
      //           context,
      //           MaterialPageRoute(
      //             builder: (context) => const CartPage(
      //               user: {},
      //             ),
      //           ),
      //         );
      //         break;
      //       case 2:
      //         print("ProductPage 2$selectedindex ");
      //         // Navigator.pushNamed(context, '/product_page');
      //         break;
      //       // handle other cases as needed...
      //     }
      //   },
      //   items: <BottomNavigationBarItem>[
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.home),
      //       label: 'Home',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: GestureDetector(
      //           onTap: () {
      //             Navigator.push(
      //               context,
      //               MaterialPageRoute(
      //                 builder: (context) => const CartPage(
      //                   user: {},
      //                 ),
      //               ),
      //             );
      //           },
      //           child: Stack(children: [
      //             const CircleAvatar(
      //               child: Icon(
      //                 Icons.shopping_cart,
      //                 color: AppColors.primarytextColor,
      //               ),
      //             ),
      //             Positioned(
      //                 right: 0,
      //                 child: Container(
      //                   padding: const EdgeInsets.all(1),
      //                   decoration: BoxDecoration(
      //                     color: AppColors.errorcolor,
      //                     borderRadius: BorderRadius.circular(6),
      //                   ),
      //                   constraints: const BoxConstraints(
      //                     minWidth: 12,
      //                     minHeight: 12,
      //                   ),
      //                   child: Text(
      //                     '${context.watch<CartProvider>().cartItems.length}',
      //                     style: const TextStyle(
      //                       color: AppColors.textcolor,
      //                       fontSize: 10,
      //                     ),
      //                     textAlign: TextAlign.center,
      //                   ),
      //                 ))
      //           ])),
      //       label: 'Cart',
      //     ),
      //     const BottomNavigationBarItem(
      //       icon: Icon(Icons.apps_outlined),
      //       label: 'Shop',
      //     ),
      //     if (user['email'] != null) ...[
      //       const BottomNavigationBarItem(
      //         icon: Icon(Icons.person),
      //         label: 'Profile',
      //       ),
      //       BottomNavigationBarItem(
      //         icon: GestureDetector(
      //             onTap: () {
      //               // Navigator.pushReplacement(
      //               //   context,
      //               //   MaterialPageRoute(
      //               //     builder: (context) => OrdersPage(user: user),
      //               //   ),
      //               // );

      //               Navigator.pushNamed(context, '/order_page');
      //             },
      //             child: Icon(Icons.file_copy_outlined)),
      //         label: 'Orders',
      //       ),
      //     ]
      //   ],
      // ),
    );
  }
}
