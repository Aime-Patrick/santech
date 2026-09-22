import 'package:flutter/material.dart';


Widget companyLogo(BuildContext context){
  return const Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      Image(
        image: AssetImage('assets/images/Feli 1.png'),
        width: 200,
        height: 200,
      ),
    ],
  );
}