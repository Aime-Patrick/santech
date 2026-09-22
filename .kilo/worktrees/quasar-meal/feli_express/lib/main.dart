import 'package:feli_express/pages/cardpayment-page.dart';
import 'package:feli_express/pages/cart.screen.dart';
import 'package:feli_express/pages/checkout.screen.dart';
import 'package:feli_express/pages/code_confirmation.dart';
import 'package:feli_express/pages/homepage.dart';
import 'package:feli_express/pages/login_screen.dart';
import 'package:feli_express/pages/logo_screen.dart';
import 'package:feli_express/pages/order.screen.dart';
import 'package:feli_express/pages/ordercornfirmation.dart';
import 'package:feli_express/pages/password_confirmation.dart';
import 'package:feli_express/pages/productpage.dart';
import 'package:feli_express/pages/register_screen.dart';
import 'package:feli_express/pages/related_product_page.dart';
import 'package:feli_express/pages/reset_password.dart';
import 'package:feli_express/pages/wishlist.page.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/state-management/category.provider.dart';
import 'package:feli_express/services/state-management/order.provider.dart';
import 'package:feli_express/services/state-management/product-class.provider.dart';
import 'package:feli_express/services/state-management/product.provider.dart';
import 'package:feli_express/services/state-management/wishlist.provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider<ProductProvider>(
        create: (context) => ProductProvider()),
    ChangeNotifierProvider<ProductClassProvider>(
        create: (context) => ProductClassProvider()),
    ChangeNotifierProvider<ProductCategoryProvider>(
        create: (context) => ProductCategoryProvider()),
    ChangeNotifierProvider<CartProvider>(create: (context) => CartProvider()),
    ChangeNotifierProvider<WishlistProvider>(
        create: (context) => WishlistProvider()),
    ChangeNotifierProvider<OrderProvider>(create: (context) => OrderProvider()),
  ], child: const FeliApp()));
}

class FeliApp extends StatefulWidget {
  const FeliApp({super.key});

  @override
  State<FeliApp> createState() => _FeliAppState();
}

class _FeliAppState extends State<FeliApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FeliExpress',
      theme: ThemeData(),
      home: const LogoScreen(),
      debugShowCheckedModeBanner: false,
      initialRoute: '/logo_screen',
      routes: {
        '/homepage': (context) => MyhomePage(),
        '/register': (context) => const RegisterPage(),
        '/logo_screen': (context) => const LogoScreen(),
        '/login': (context) => LoginPage(),
        '/reset_password': (context) => const ResetPassword(),
        '/password_confirmation': (context) => const PasswordConfirmation(),
        '/code_confirmation': (context) => const CodeConfirmation(),
        // '/user_profile': (context) => UserProfilePage(),
        '/order_confirmation': (context) => OrderConfirmation(),
        '/cart': (context) => const CartPage(user: {},),
        '/product_page': (context) => const ProductPage(),
        '/related_products': (context) =>
            const RelatedProductsScreen(selectedProductID: ''),
        '/wishlist': (context) => const WishlistPage(),
        '/checkout': (context) => const CheckoutPage(),
        // '/card_payment': (context) => CardPaymentPage(),
        // '/mobile_money': (context) => MobileMoneyPage(),
        '/order_page': (context) => OrdersPage(user: {}),
      },
    );
  }
}
