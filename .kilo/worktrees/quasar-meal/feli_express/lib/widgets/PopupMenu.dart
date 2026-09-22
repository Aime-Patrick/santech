import 'package:feli_express/functions/Apis/authentication.api.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:flutter/material.dart';

Widget MyPopupMenuButton(BuildContext context, user) {
  LocalStorageService localStorageService = LocalStorageService();
  // function to handel logout
  void logout() async {
    await localStorageService.clearAll().then((value) {
      Navigator.pushNamed(context, '/homepage');
    });
  }

  return Builder(builder: (context) {
    return PopupMenuButton(
      icon: Icon(Icons.person),
      offset: Offset(0, 50),
      onSelected: (value) async {
        switch (value) {
          case 'logout':
            // await signOut();
            // Navigator.of(context).pushNamed('/login');
            break;
          case 'login':
            print('login');
            Navigator.of(context).pushNamed('/login');
            break;
          case 'register':
            Navigator.of(context).pushNamed('/register');
            break;
          case 'user_profile':
            Navigator.of(context).pushNamed('/user_profile');
            break;
          case 'settings':
            Navigator.of(context).pushNamed('/settings');
            break;
          case 'wishlist':
            Navigator.of(context).pushNamed('/wishlist');
            break;
          // Add more cases here for other menu items
        }
      },
      itemBuilder: (context) => [
        if (user['email'] != null) ...[
          PopupMenuItem(
            value: '',
            child: Text(
                (user['firstName'] ?? '') + ' ' + (user['lastName'] ?? '')),
          ),
          PopupMenuItem(
            value: 'user_profile',
            child: Text('Profile'),
          ),
          PopupMenuItem(
            value: 'logout',
            child: Text('Logout'),
            onTap: () {
              logout();
            },
          ),
        ],
        if (user['email'] == null) ...[
          PopupMenuItem(
            value: 'login',
            child: Text('Login '),
          ),
          PopupMenuItem(
            value: 'register',
            child: Text('Register'),
          ),
        ]
        // PopupMenuItem(
        //   value: 'settings',
        //   child: Text('Settings'),
        // ),

        // PopupMenuItem(
        //   value: 'wishlist',
        //   child: Text('Wishlist'),
        // ),
        // Add more PopupMenuItems here for other menu items
      ],
    );
  });
}
