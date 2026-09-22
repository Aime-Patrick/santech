// import 'package:feli_express/models/product.model.dart';
// import 'package:feli_express/utils/colors.dart';
// import 'package:flutter/material.dart';

// class ProductColors extends StatefulWidget {
//   final Product product;
//   final Function(String) onColorSelected;

//   final Function(String) onImageSelected;
//   final Function(int) onQtySelected;

//   final Function(String)? onSizeSelected;

//   ProductColors(
//       {required this.product,
//       required this.onColorSelected,
//       this.onSizeSelected,
//       required this.onImageSelected,
//       required this.onQtySelected});

//   @override
//   _ProductColorsState createState() => _ProductColorsState();
// }

// class _ProductColorsState extends State<ProductColors> {
//   String selectedColor = '';
//   String selectedImage = '';
//   String selectedSize = '';
//   int qty = 0;

//   @override
//   Widget build(BuildContext context) {
//     return widget.product.hasColors == true
//         ? SingleChildScrollView(
//             scrollDirection: Axis.horizontal,
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: widget.product?.colorMeasurementVariations?.variations
//                       ?.map((e) {
//                     return Container(
//                       color: e?.measurementvalue != null
//                           ? Colors.red
//                           : Colors.white,
//                       child: Column(
//                         children: [
//                           GestureDetector(
//                             onTap: () {
//                               setState(() {
//                                 selectedColor =
//                                     e?.colorImg?.colorName as String;
//                                 selectedImage = e?.colorImg!.url as String;
//                                 selectedSize = e?.measurementvalue != null
//                                     ? e?.measurementvalue as String
//                                     : '';
//                                 qty =
//                                     e?.colorMeasurementVariationQuantity as int;
//                               });
//                               widget.onColorSelected(
//                                   e?.colorImg?.colorName as String);
//                               widget.onSizeSelected!(
//                                   e?.measurementvalue as String);
//                               widget
//                                   .onImageSelected(e?.colorImg!.url as String);
//                               widget.onQtySelected(
//                                   e?.colorMeasurementVariationQuantity as int);
//                               print(
//                                   'selectedColor: $selectedImage $selectedColor $selectedSize $qty');
//                             },
//                             child: Container(
//                               margin: EdgeInsets.fromLTRB(8.0, 0.0, 8.0, 0.0),
//                               decoration: BoxDecoration(
//                                 color: AppColors.textcolor,
//                                 shape: BoxShape.circle,
//                                 boxShadow: [
//                                   BoxShadow(
//                                     color: Colors.black.withOpacity(0.1),
//                                     blurRadius: 8,
//                                     spreadRadius: 5,
//                                   )
//                                 ],
//                               ),
//                               child: e?.colorImg != null
//                                   ? ClipRRect(
//                                       borderRadius: BorderRadius.circular(50),
//                                       child: Image.network(
//                                         '${e?.colorImg!.url}',
//                                         fit: BoxFit.cover,
//                                         height: 50,
//                                         width: 50,
//                                       ),
//                                     )
//                                   : SizedBox(),
//                             ),
//                           ),
//                           Column(
//                             children: [
//                               Text(e?.colorImg?.colorName ?? ''),
//                               Text(e?.measurementvalue ?? ''),
//                               Text(
//                                   "Qty : ${e?.colorMeasurementVariationQuantity?.toString()}" ??
//                                       ''),
//                             ],
//                           ),
//                         ],
//                       ),
//                     );
//                   })?.toList() ??
//                   [],
//             ),
//           )
//         : const Row(
//             mainAxisAlignment: MainAxisAlignment.center,
//             children: [
//               Text(
//                 'No more Colors',
//                 style: TextStyle(
//                     fontSize: 16,
//                     fontWeight: FontWeight.bold,
//                     color: AppColors.primarytextColor),
//               ),
//             ],
//           );
//   }
// }

import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';

class ProductColors extends StatefulWidget {
  final Product product;
  final Function(String) onColorSelected;
  final Function(String) onImageSelected;
  final Function(int) onQtySelected;
  final Function(String)? onSizeSelected;

  ProductColors({
    required this.product,
    required this.onColorSelected,
    this.onSizeSelected,
    required this.onImageSelected,
    required this.onQtySelected,
  });

  @override
  _ProductColorsState createState() => _ProductColorsState();
}

class _ProductColorsState extends State<ProductColors> {
  String selectedColor = '';
  String selectedImage = '';
  String selectedSize = '';
  int qty = 0;

  @override
  Widget build(BuildContext context) {
    return widget.product.hasColors == true
        ? SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: widget.product.colorMeasurementVariations?.variations
                      ?.map((e) {
                    return Container(
                      child: Column(
                        children: [
                          GestureDetector(
                            onTap: () {
                              setState(() {
                                selectedColor = e?.colorImg?.colorName ?? '';
                                selectedImage = e?.colorImg?.url ?? '';
                                selectedSize = e?.measurementvalue ?? '';
                                qty = e?.colorMeasurementVariationQuantity ?? 0;
                              });
                              widget.onColorSelected(
                                  e?.colorImg?.colorName ?? '');
                              if (widget.onSizeSelected != null) {
                                widget
                                    .onSizeSelected!(e?.measurementvalue ?? '');
                              }
                              widget.onImageSelected(e?.colorImg?.url ?? '');
                              widget.onQtySelected(
                                  e?.colorMeasurementVariationQuantity ?? 0);
                              print(
                                  'selectedColor: $selectedImage $selectedColor $selectedSize $qty');
                            },
                            child: Container(
                              margin: EdgeInsets.fromLTRB(8.0, 0.0, 8.0, 0.0),
                              decoration: BoxDecoration(
                                color: AppColors.textcolor,
                                shape: BoxShape.circle,
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.1),
                                    blurRadius: 8,
                                    spreadRadius: 5,
                                  )
                                ],
                              ),
                              child: e?.colorImg != null
                                  ? ClipRRect(
                                      borderRadius: BorderRadius.circular(50),
                                      child: Image.network(
                                        e?.colorImg?.url ?? '',
                                        fit: BoxFit.cover,
                                        height: 50,
                                        width: 50,
                                      ),
                                    )
                                  : SizedBox(),
                            ),
                          ),
                          Column(
                            children: [
                              Text(e?.colorImg?.colorName ?? ''),
                              Text(e?.measurementvalue ?? ''),
                              Text(
                                  "Qty : ${e?.colorMeasurementVariationQuantity?.toString() ?? ''}"),
                            ],
                          ),
                        ],
                      ),
                    );
                  })?.toList() ??
                  [],
            ),
          )
        : const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'No more Colors',
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primarytextColor),
              ),
            ],
          );
  }
}
