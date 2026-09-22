import 'dart:async';

import 'package:feli_express/functions/Apis/category.api.dart';
import 'package:feli_express/functions/Apis/orders.api.dart';
import 'package:feli_express/functions/Apis/product.api.dart';
import 'package:feli_express/functions/Apis/productclass.api.dart';
import 'package:feli_express/services/state-management/category.provider.dart';
import 'package:feli_express/services/state-management/order.provider.dart';
import 'package:feli_express/services/state-management/product-class.provider.dart';
import 'package:feli_express/services/state-management/product.provider.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/elevatedbutton.dart';
import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:provider/provider.dart';

class LogoScreen extends StatefulWidget {
  const LogoScreen({super.key});

  @override
  State<LogoScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LogoScreen> {
  bool _isLoading = true;

  // // get the product from api
  ProductController futureproduct = ProductController();
  CategoryController fururecategories = CategoryController();
  ProductClassController futureproductclass = ProductClassController();

  OrderController futureorders = OrderController();
  LocalStorageService localStorageService = LocalStorageService();
  late String token;

  // @override
  // void initState() {
  //   super.initState();
  //   futureproduct.getProduct();
  // }

  @override
  void initState() {
    super.initState();
    Future.wait([
      futureproduct.getProduct().then((value) {
        for (var product in value) {
          print('productclass ddd: $product');
          context.read<ProductProvider>().addProduct(product);
        }
      }),
      futureproductclass.getProductClass().then((value) {
        for (var productclass in value) {
          print('productclass: $productclass');
          context.read<ProductClassProvider>().addProductclass(productclass);
        }
      }),
      fururecategories.getCategory().then((value) {
        for (var cat in value) {
          print('productcategories: $cat');
          context.read<ProductCategoryProvider>().addProductCategory(cat);
        }
      }),
      localStorageService.getToken().then((value) {
        if (value != null) {
          futureorders.getOrders(value).then((value) {
            for (var order in value) {
              print("orders on logoscreen $order ");
              context.read<OrderProvider>().addOrder(order);
            }
          });
        }
        setState(() {
          token = value ?? '';
        });
      }),
    ]).then((_) {
      setLoading(false);
      setState(() {
        _isLoading = false;
      });
    });
    // WidgetsBinding.instance.addPostFrameCallback((_) {
    //   context.read<ProductProvider>().fetchAndAddProducts();
    // });
  }

  @override
  void dispose() {
    super.dispose();
  }

  setLoading(bool loading) {
    setState(() {
      _isLoading = loading;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: AppColors.AppColor,
        body: SingleChildScrollView(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 50),
                const Image(
                  image: AssetImage('assets/images/feli 3.png'),
                  width: 300,
                  height: 300,
                ),
                const SizedBox(height: 20),
                _isLoading
                    ? SizedBox(
                        width: 60.0,
                        height: 60.0,
                        child: LoadingAnimationWidget.discreteCircle(
                          color: AppColors.primaryColor,
                          secondRingColor: Color.fromARGB(255, 244, 155, 54),
                          thirdRingColor: Color.fromARGB(255, 106, 107, 111),
                          size: 50,
                        ),
                      )
                    : MyElevatedButton(
                        context,
                        40.0,
                        'Get Started',
                        () async {
                          // setState(() {
                          //   _isLoading = true;
                          //   print('Loading...');
                          // });

                          // context.read<ProductProvider>().addProduct(product);
                          // await Future.delayed(const Duration(seconds: 4));
                          setState(() {
                            _isLoading = false;
                          });
                          // Navigator.pushNamed(context, '/homepage');
                          Navigator.popAndPushNamed(context, '/homepage');
                        },
                        _isLoading,
                        setLoading,
                      ),
              ],
            ),
          ),
        ));
  }
}
