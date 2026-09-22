import 'dart:convert';

import 'package:feli_express/models/user.model.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:http/http.dart' as http;

Future<dynamic> signUp(
  String firstName,
  String lastName,
  String email,
  String password,
  String confirmPassword,
) async {
  var url =
      Uri.parse("https://staging-w5ij.onrender.com/api/v1/auth/register");
  var response = await http.post(
    url,
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(User(
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    ).toJson()),
  );

  print("signupclicked");

  if (response.statusCode == 201) {
    var responseBody = jsonDecode(response.body);

    return responseBody;
  } else {
    throw Exception("${jsonDecode(response.body)['message']}");
  }
}

Future<dynamic> signIn(String email, String password) async {
  // var url = Uri.parse('http://10.0.2.2:5000/api/v1/auth/login');
  var url =
      Uri.parse("https://staging-w5ij.onrender.com/api/v1/auth/login");

  // var url = Uri.parse('http://10.0.2.2:3002/api/v1/auth/login');
  var response = await http.post(
    url,
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'email': email,
      'password': password,
    }),
  );

  if (response.statusCode == 200) {
    var responseBody = jsonDecode(response.body);
    var userJson = responseBody['data']['user'];
    var token = responseBody['token'];
    print("userJson: $userJson token: $token");

    LocalStorageService localStorageService = await LocalStorageService();
    await localStorageService.setToken(token);

    await localStorageService.setUserData(userJson);

    return {
      'user': userJson,
      'token': token,
    };
  } else {
    throw Exception("${jsonDecode(response.body)['message']}");
  }
}

Future<dynamic> signOut() async {
  LocalStorageService localStorageService = await LocalStorageService();
  await localStorageService.clearAll();
}
