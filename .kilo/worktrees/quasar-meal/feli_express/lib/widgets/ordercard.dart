// import 'package:feli_express/models/cart.model.dart';
// import 'package:feli_express/models/order.model.dart';
// import 'package:feli_express/models/order2.model.dart' as order2;
// import 'package:feli_express/models/product.model.dart';
// import 'package:feli_express/services/state-management/cart.provider.dart';
// import 'package:feli_express/services/state-management/product.provider.dart';
// import 'package:feli_express/utils/colors.dart';
// import 'package:feli_express/widgets/orderstatus.dart';
// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';

// class OrderCard extends StatefulWidget {
//   final order2.Order2 order;

//   OrderCard({required this.order});

//   @override
//   State<OrderCard> createState() => _OrderCardState();
// }

// class _OrderCardState extends State<OrderCard> {
//   bool _showMore = false;

//   var statusColors = {
//     "awaits payment": "#FAD02E",
//     "pending": "#F0690E",
//     "processing": "#2E8B57",
//     "shipped": "#008080",
//     "delivered": "#006400",
//     "cancelled": "#FF0000",
//     "transaction failed": "#8B0000",
//   };

//   String getStatusColor(String status) {
//     return statusColors[status.toLowerCase()] ?? "#00055550";
//   }

//   @override
//   Widget build(BuildContext context) {
//     var cartData = context.watch<CartProvider>();
//     int totalQuantity = cartData.cartItems.length;
//     double totalPrice = cartData.totalPrice as double;
//     List<order2.ItemOrder> allItems = widget.order.items;
//     final product2 = context.watch<ProductProvider>().products;
//     int index = 0;

//     return Card(
//       margin: EdgeInsets.symmetric(horizontal: 8.0, vertical: 15.0),
//       child: Padding(
//         padding: const EdgeInsets.all(8.0),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Text('Order : ${widget.order.id}',
//                 style: TextStyle(fontWeight: FontWeight.bold)),
//             Text('Date: ${widget.order.createdAt.toString()}'),
//             Text(
//                 'Address:  ${widget.order.shippingAddress.province}/ ${widget.order.shippingAddress.district} /${widget.order.shippingAddress.sector} /${widget.order.shippingAddress.district}/${widget.order.shippingAddress.cell}/${widget.order.shippingAddress.village}/${widget.order.shippingAddress.address.street} '),
//             SizedBox(height: 10),
//             Text('Phone:  ${widget.order.shippingAddress.phoneNumber} '),
//             SizedBox(height: 10),
//             Text(
//               'Amount: ${(widget.order.amount).toStringAsFixed(1)} RWF',
//               style: const TextStyle(
//                   fontWeight: FontWeight.bold, color: AppColors.primaryColor),
//             ),
//             SizedBox(height: 8.0),
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 SizedBox(
//                   height: 30.0,
//                   child: ElevatedButton(
//                     onPressed: () {
//                       setState(() {
//                         _showMore = !_showMore;
//                       });
//                     },
//                     style: ElevatedButton.styleFrom(
//                       backgroundColor: AppColors.primaryColor,
//                       shape: RoundedRectangleBorder(
//                         borderRadius: BorderRadius.circular(20.0),
//                       ),
//                     ),
//                     child: Text(_showMore ? 'View less' : 'View more',
//                         style: TextStyle(
//                             color: Colors.white, fontWeight: FontWeight.w400)),
//                   ),
//                 ),
//                 // if (allItems.isNotEmpty)

//                 // else
//                 //   Text('Amount: 0 RWF'),
//                 OrderStatusLabel(status: widget.order.status),
//               ],
//             ),
//             SizedBox(height: 8.0),
//             if (_showMore && allItems.isNotEmpty)
//               SizedBox(
//                 height: 350,
//                 child: ListView.builder(
//                   itemCount: allItems.length,
//                   //padding: EdgeInsets.only(bottom: 100),
//                   itemBuilder: (context, index) {
//                     return Padding(
//                       padding: const EdgeInsets.only(bottom: 10),
//                       child: Row(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           Container(
//                             width: 150,
//                             height: 150,
//                             decoration: BoxDecoration(
//                               color: AppColors.AppColor,
//                               borderRadius: BorderRadius.circular(15),
//                               image: DecorationImage(
//                                 image: NetworkImage(
//                                     allItems[index].productThumbnail),
//                                 fit: BoxFit.fill,
//                               ),
//                             ),
//                           ),
//                           SizedBox(width: 5),
//                           Expanded(
//                             child: Container(
//                               decoration: BoxDecoration(
//                                 color: AppColors.AppColor,
//                                 borderRadius: BorderRadius.circular(15),
//                               ),
//                               child: Padding(
//                                 padding: const EdgeInsets.all(8.0),
//                                 child: FutureBuilder<Iterable<Product>>(
//                                   future: context
//                                       .read<ProductProvider>()
//                                       .getProduct(allItems[index].product),
//                                   builder: (context, snapshot) {
//                                     if (snapshot.connectionState ==
//                                         ConnectionState.waiting) {
//                                       return CircularProgressIndicator();
//                                     } else if (snapshot.hasError) {
//                                       return Text('Error: ${snapshot.error}');
//                                     } else {
//                                       var productName =
//                                           snapshot.data?.first.name;
//                                       return Column(
//                                         crossAxisAlignment:
//                                             CrossAxisAlignment.start,
//                                         children: [
//                                           Text("${productName}",
//                                               style: TextStyle(
//                                                   fontWeight: FontWeight.bold,
//                                                   fontSize: 16)),
//                                           SizedBox(height: 10),
//                                           Text(
//                                               'Price: ${allItems[index].price * allItems[index].quantity} RWF'),
//                                           SizedBox(height: 10),
//                                           Text(
//                                               'Items: ${allItems[index].quantity}'),
//                                           SizedBox(height: 10),
//                                           if ((allItems[index]
//                                                   .variation!
//                                                   .size) !=
//                                               '') ...[
//                                             Text(
//                                                 'Size: ${allItems[index].variation!.size} ')
//                                           ],
//                                           SizedBox(height: 10),
//                                           if ((allItems[index]
//                                                   .variation!
//                                                   .color) !=
//                                               '') ...[
//                                             Text(
//                                                 'Color: ${allItems[index].variation!.color} ')
//                                           ],
//                                           SizedBox(height: 10),
//                                         ],
//                                       );
//                                     }
//                                   },
//                                 ),
//                               ),
//                             ),
//                           )
//                         ],
//                       ),
//                     );
//                   },
//                 ),
//               ),
//           ],
//         ),
//       ),
//     );
//   }
// }

// extension DateFormat on DateTime {
//   String toShortDateString() {
//     return '${this.day}/${this.month}/${this.year}';
//   }
// }

import 'package:feli_express/models/cart.model.dart';
import 'package:feli_express/models/order.model.dart';
import 'package:feli_express/models/order2.model.dart' as order2;
import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/state-management/product.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/orderstatus.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class OrderCard extends StatefulWidget {
  final order2.Order2 order;

  OrderCard({required this.order});

  @override
  State<OrderCard> createState() => _OrderCardState();
}

class _OrderCardState extends State<OrderCard> {
  bool _showMore = false;

  var statusColors = {
    "awaits payment": "#FAD02E",
    "pending": "#F0690E",
    "processing": "#2E8B57",
    "shipped": "#008080",
    "delivered": "#006400",
    "cancelled": "#FF0000",
    "transaction failed": "#8B0000",
  };

  String getStatusColor(String status) {
    return statusColors[status.toLowerCase()] ?? "#00055550";
  }

  @override
  Widget build(BuildContext context) {
    var cartData = context.watch<CartProvider>();
    int totalQuantity = cartData.cartItems.length;
    double totalPrice = cartData.totalPrice as double;
    List<order2.ItemOrder> allItems = widget.order.items;
    final product2 = context.watch<ProductProvider>().products;
    int index = 0;

    return Card(
      margin: EdgeInsets.symmetric(horizontal: 8.0, vertical: 15.0),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Order : ${widget.order.id}',
                style: TextStyle(fontWeight: FontWeight.bold)),
            Text('Date: ${widget.order.createdAt.toString()}'),
            Text(
                'Address:  ${widget.order.shippingAddress.province}/ ${widget.order.shippingAddress.district} /${widget.order.shippingAddress.sector} /${widget.order.shippingAddress.district}/${widget.order.shippingAddress.cell}/${widget.order.shippingAddress.village}/${widget.order.shippingAddress.address.street} '),
            SizedBox(height: 10),
            Text('Phone:  ${widget.order.shippingAddress.phoneNumber} '),
            SizedBox(height: 10),
            Text(
              'Amount: ${(widget.order.amount).toStringAsFixed(1)} RWF',
              style: const TextStyle(
                  fontWeight: FontWeight.bold, color: AppColors.primaryColor),
            ),
            SizedBox(height: 8.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                SizedBox(
                  height: 30.0,
                  child: ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _showMore = !_showMore;
                      });
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primaryColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                    ),
                    child: Text(_showMore ? 'View less' : 'View more',
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.w400)),
                  ),
                ),
                OrderStatusLabel(status: widget.order.status),
              ],
            ),
            SizedBox(height: 8.0),
            if (_showMore && allItems.isNotEmpty)
              SizedBox(
                height: 350,
                child: ListView.builder(
                  itemCount: allItems.length,
                  itemBuilder: (context, index) {
                    var item = allItems[index];
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            width: 150,
                            height: 150,
                            decoration: BoxDecoration(
                              color: AppColors.AppColor,
                              borderRadius: BorderRadius.circular(15),
                              image: DecorationImage(
                                image: NetworkImage(item.productThumbnail),
                                fit: BoxFit.fill,
                              ),
                            ),
                          ),
                          SizedBox(width: 5),
                          Expanded(
                            child: Container(
                              decoration: BoxDecoration(
                                color: AppColors.AppColor,
                                borderRadius: BorderRadius.circular(15),
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    FutureBuilder<Iterable<Product>>(
                                      future: context
                                          .read<ProductProvider>()
                                          .getProduct(item.product),
                                      builder: (context, snapshot) {
                                        if (snapshot.connectionState ==
                                            ConnectionState.waiting) {
                                          return CircularProgressIndicator();
                                        } else if (snapshot.hasError) {
                                          return Text(
                                              'Error: ${snapshot.error}');
                                        } else if (snapshot.hasData &&
                                            snapshot.data!.isNotEmpty) {
                                          var productName =
                                              snapshot.data!.first.name;
                                          return Text(
                                            productName,
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                                fontSize: 16),
                                          );
                                        } else {
                                          return Text('');
                                        }
                                      },
                                    ),
                                    SizedBox(height: 10),
                                    Text(
                                        'Price: ${item.price * item.quantity} RWF'),
                                    SizedBox(height: 10),
                                    Text('Items: ${item.quantity}'),
                                    SizedBox(height: 10),
                                    if ((item.variation?.size ?? '').isNotEmpty)
                                      Text('Size: ${item.variation!.size}'),
                                    SizedBox(height: 10),
                                    if ((item.variation?.color ?? '')
                                        .isNotEmpty)
                                      Text('Color: ${item.variation!.color}'),
                                    SizedBox(height: 10),
                                  ],
                                ),
                              ),
                            ),
                          )
                        ],
                      ),
                    );
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}

extension DateFormat on DateTime {
  String toShortDateString() {
    return '${this.day}/${this.month}/${this.year}';
  }
}
