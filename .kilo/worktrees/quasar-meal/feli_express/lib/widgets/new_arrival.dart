import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/widgets/productCard.dart';
import 'package:feli_express/widgets/productdialogue.dart';
import 'package:flutter/material.dart';

Widget NewArrivalProducts(BuildContext context, List<Product> products) {
  DateTime currentDate = DateTime.now();

  List<Product> newProducts = products
      .where(
          (product) => currentDate.difference(product.createdAt).inDays <= 25)
      .toList();

  if (newProducts.isEmpty) {
    return SizedBox.shrink();
  }
  ;

  return SizedBox(
    height: 250,
    width: double.infinity,
    child: ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: newProducts.length,
      itemBuilder: (context, index) {
        final product = newProducts[index];
        return Container(
          width: 200,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: GestureDetector(
                onTap: () {
                  MyProductDialogue(context, product);
                },
                child: productCard(
                    context, product)), // Using productCard widget here
          ),
        );
      },
    ),
  );
}
