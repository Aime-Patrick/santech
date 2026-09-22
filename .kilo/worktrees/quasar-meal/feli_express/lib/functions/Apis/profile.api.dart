import 'dart:convert';
import 'dart:io';

import 'package:feli_express/functions/Apis/payment.api.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart' as http;
import 'package:mime/mime.dart';
import 'package:http_parser/http_parser.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:path/path.dart';

Future<String?> updateProfileImage(
    File image, String token, BuildContext context) async {
  final url =
      Uri.parse('https://staging-w5ij.onrender.com/api/v1/auth/update-photo');
  // Log the MIME type
  final mimeType = lookupMimeType(image.path);
  print('MIME type of the file: $mimeType');
  print("image to upload $image");

  try {
    final request = http.MultipartRequest('PATCH', url);
    request.headers['Authorization'] = 'Bearer $token';
    final file = await http.MultipartFile.fromPath(
      'profilePicture',
      image.path,
      contentType: MediaType.parse(mimeType ?? 'application/octet-stream'),
    );
    request.files.add(file);

    final response = await request.send();
    final responseData = await response.stream.bytesToString();

    print("response data $responseData statuscode${response.statusCode}");
    if (response.statusCode == 200) {
      final responseJson = jsonDecode(responseData);
      var imageUrl = responseJson['data']['user']['photo'];
      print("image url $imageUrl");
      return imageUrl;
    } else if (response.statusCode == 401) {
      // Navigator.pushReplacementNamed(context, '/login');
      await handleLogout(context);
    } else {
      throw Exception('Failed to update profile image: $responseData');
    }
  } catch (error) {
    print('Error updating profile image: $error');
    rethrow; // Re-throw to propagate the error to the caller
  }
}

Future<String?> updateUsernamesApi(String firstName, String lastName,
    String token, BuildContext context) async {
  final url =
      Uri.parse('https://staging-w5ij.onrender.com/api/v1/auth/profile-data');

  // final url = Uri.parse('http://10.0.2.2:5000/api/v1/auth/profile-data');

  // Decode the token to inspect its contents
  Map<String, dynamic> decodedToken = JwtDecoder.decode(token);
  print("Decoded Token: $decodedToken");

  // Check token expiry
  if (JwtDecoder.isExpired(token)) {
    print('Token is expired');
    throw Exception('Token is expired');
  }

  try {
    final response = await http.patch(url,
        headers: <String, String>{
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'firstName': firstName,
          'lastName': lastName,
        }));

    final responseData = jsonDecode(response.body);

    if (response.statusCode == 201) {
      return responseData['message'];
    } else if (response.statusCode == 401) {
      await handleLogout(context);
    } else {
      throw Exception(
          'Failed to update profile names: ${responseData['message']}');
    }
  } catch (error) {
    print('Error updating profile names: $error');
    rethrow;
  }
}
