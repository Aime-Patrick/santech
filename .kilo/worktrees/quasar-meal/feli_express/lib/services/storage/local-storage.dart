// import 'package:localstorage/localstorage.dart';
// import 'package:shared_preferences/shared_preferences.dart';

// class LocalStorageService {
//   final LocalStorage storage = LocalStorage('ecommerce_app');

//   Future<void> setToken(String token) async {
//     await storage.setItem('token', token);
//   }

//   Future<String> getToken() async {
//     return storage.getItem('token');
//   }

//   Future<void> setUserData(Map<String, dynamic> user) async {
//     await storage
//         .setItem('user', user)
//         .then((value) => print("setuser${user}"));
//     // Navigator.pushNamed(context, routeName)
//   }

//   Future<Map<String, dynamic>> getUserData() async {
//     print("getuser${storage.getItem('user')}");
//     var userData = await storage.getItem('user');
//     print("getuser${userData}");
//     return userData ?? {};
//   }

//   Future<void> clearAll() async {
//   try {
//     await storage.clear();
//   } catch (e) {
//     print('Failed to clear local storage: $e');
//     // Handle the error appropriately.
//     // For example, you might want to show a message to the user.
//   }
// }
// }

import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class LocalStorageService {
  // Store a token
  Future<void> setToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
  }

  // Retrieve a token
  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

  // Store user data
  Future<void> setUserData(Map<String, dynamic> user) async {
    final prefs = await SharedPreferences.getInstance();
    String userJson = jsonEncode(user);
    await prefs.setString('user', userJson);
  }

  // Retrieve user data
  Future<Map<String, dynamic>?> getUserData() async {
    final prefs = await SharedPreferences.getInstance();
    String? userJson = prefs.getString('user');
    if (userJson != null) {
      Map<String, dynamic> userMap = jsonDecode(userJson);
      return userMap;
    }
    return null;
  }

  // Clear all data
  Future<void> clearAll() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.clear();
    } catch (e) {
      print('Failed to clear local storage: $e');
      // Handle the error appropriately.
      // For example, you might want to show a message to the user.
    }
  }
  Future<void>saveWishlist(List<dynamic>wishlist) async{
    try{
      final prefs = await SharedPreferences.getInstance();
      String wishlistJson = jsonEncode(wishlist);
      await prefs.setString('wishlist', wishlistJson);
    }
    catch (e) {
      print('Failed to save wishlist: $e');
    }
  }
  Future<List<dynamic>?>loadWishlist() async{
    final prefs = await SharedPreferences.getInstance();
    String? wishlistJson = prefs.getString('wishlist');
    if (wishlistJson != null) {
      List<dynamic> wishlist = jsonDecode(wishlistJson);
      return wishlist;
    }
    return null;
  }     
}
