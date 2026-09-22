import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/state-management/wishlist.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/productCard.dart';
import 'package:feli_express/widgets/productdialogue.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class WishlistPage extends StatefulWidget {
  const WishlistPage({Key? key});

  @override
  State<WishlistPage> createState() => _WishlistPageState();
}

class _WishlistPageState extends State<WishlistPage> {
  @override
  Widget build(BuildContext context) {
    var wishlistItems = context.watch<WishlistProvider>();
    List<Product> allItems = wishlistItems.allItems;

    //  --access app cart state
    var cartData = context.watch<CartProvider>();

    return Scaffold(
      backgroundColor: AppColors.AppColor,
      appBar: AppBar(
        backgroundColor: AppColors.AppColor,
        automaticallyImplyLeading: false,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new),
          onPressed: () {
            Navigator.pushNamed(context, '/homepage');
          },
        ),
        title: const Text(
          'Favorite Items',
          style: TextStyle(
            color: AppColors.primarytextColor,
            fontSize: 25,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Padding(
            padding: EdgeInsets.all(19.0),
            child: Text(
              'My Wishlist',
              style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(height: 10),
          if (allItems.isEmpty)
            const Center(
              child: Column(
                children: [
                  Icon(
                    Icons.favorite_border,
                    size: 200,
                    color: AppColors.secondaryColor,
                  ),
                  SizedBox(height: 20),
                  Text(
                    'No items in your wishlist yet!',
                    style: TextStyle(
                        fontSize: 20, color: AppColors.secondaryColor),
                  ),
                ],
              ),
            )
          else
            allItems.isNotEmpty
                ? Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Wrap(
                      spacing: 5, // horizontal space between cards
                      runSpacing: 5, // vertical space between lines
                      children: List<Widget>.generate(allItems.length, (index) {
                        Product product = allItems[index];
                        return GestureDetector(
                          onTap: () {
                            MyProductDialogue(context, product);
                          },
                          child: productCard(context, product),
                        );
                      }),
                    ),
                  )
                : Container()
          // GridView.builder(
          //   gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          //     crossAxisCount: MediaQuery.of(context).size.width > 600
          //         ? 4
          //         : MediaQuery.of(context).size.width > 450
          //             ? 3
          //             : 2,
          //     childAspectRatio: 0.7,
          //     mainAxisSpacing: 10,
          //     crossAxisSpacing: 10,
          //   ),
          //   itemCount: allItems.length,
          //   shrinkWrap: true,
          //   padding: EdgeInsets.fromLTRB(10.0, 5.0, 5.0, 10.0),
          //   physics: const NeverScrollableScrollPhysics(),
          //   itemBuilder: (context, index) {
          //     var product = allItems[index];
          //     return productCard(context, product);
          //   },
          // ),
        ]),
      ),
    );
  }
}
