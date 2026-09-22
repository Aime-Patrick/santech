import 'dart:convert';
import 'dart:io';

import 'package:feli_express/services/storage/local-storage.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<dynamic> handleLogout(context) async {
  LocalStorageService localStorageService = LocalStorageService();
  try {
    await localStorageService.clearAll().then((value) {
      Navigator.pushReplacementNamed(context, '/login');
    });
  } catch (error) {
    print('Error logging out: $error');
    rethrow;
  }
}

Future<dynamic> payWithMomo(
    Map<String, dynamic> payload, String token, context) async {
  final url = Uri.parse(
      'https://staging-w5ij.onrender.com/api/v1/payments/checkout/momo');

  // var url = Uri.parse('http://10.0.2.2:5000/api/v1/payments/checkout/momo');

  print("Payload: ${jsonEncode(payload)}");

  LocalStorageService localStorageService = LocalStorageService();

  try {
    final response = await http.post(
      url,
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );

    final responseData = jsonDecode(response.body);

    print("Response: ${response.body}, Status Code: ${response.statusCode}");

    if (response.statusCode == 201) {
      return responseData['data']['meta']['authorization'];
    } else if (response.statusCode == 401) {
      // function to handel logout
      await localStorageService.clearAll().then((value) {
        Navigator.pushReplacementNamed(context, '/login');
      });
      // Navigator.pushReplacementNamed(context, '/login');
    } else {
      throw Exception('Failed to pay with momo');
    }
  } catch (error) {
    print('Error pay with momo: $error');
    rethrow;
  }
}

Future<dynamic> payWithCard(
    Map<String, dynamic> payload, String token, context) async {
  final url = Uri.parse(
      'https://staging-w5ij.onrender.com/api/v1/payments/checkout/card');

  // var url = Uri.parse('http://10.0.2.2:5000/api/v1/payments/checkout/card');

  try {
    final response = await http.post(
      url,
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );

    final responseData = jsonDecode(response.body);

    print(
        "Response on card py: ${response.body}, Status Code: ${responseData['data']['redirect_url']} ");

    if (response.statusCode == 200) {
      return responseData['data'];
    } else if (response.statusCode == 401) {
      await handleLogout(context);
      // Navigator.pushReplacementNamed(context, '/login');
    } else {
      throw Exception('Failed to pay with card');
    }
  } catch (error) {
    print('Error pay with card: $error');
    rethrow;
  }
}

Future<dynamic> payWithCardPin(
    Map<String, dynamic> payload, String token, context) async {
  final url = Uri.parse(
      'https://staging-w5ij.onrender.com/api/v1/payments/authorize-card');

  print("Payload: ${jsonEncode(payload)}");

  try {
    final response = await http.post(
      url,
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );

    final responseData = jsonDecode(response.body);

    print(
        "Response on card pin: ${response.body}, Status Code: ${response.statusCode}  ${responseData}");

    if (response.statusCode == 200) {
      return responseData['data'];
    } else if (response.statusCode == 401) {
      // Navigator.pushReplacementNamed(context, '/login');
      await handleLogout(context);
    } else {
      throw Exception('Failed to pay with card');
    }
  } catch (error) {
    print('Error pay with card pin: $error');
    rethrow;
  }
}

Future<dynamic> payWithOtp(
    Map<String, dynamic> payload, String token, context) async {
  final url = Uri.parse(
      'https://staging-w5ij.onrender.com/api/v1/payments/validate-card');

  print("Payload: ${jsonEncode(payload)}");

  try {
    final response = await http.post(
      url,
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );

    final responseData = jsonDecode(response.body);

    print(
        "Response on card otp: ${response.body}, Status Code: ${response.statusCode}  ${responseData}");

    if (response.statusCode == 200) {
      return responseData['data'];
    } else if (response.statusCode == 401) {
      // Navigator.pushReplacementNamed(context, '/login');
      await handleLogout(context);
    } else {
      throw Exception('Failed to pay with card');
    }
  } catch (error) {
    print('Error pay with card pin: $error');
    rethrow;
  }
}
