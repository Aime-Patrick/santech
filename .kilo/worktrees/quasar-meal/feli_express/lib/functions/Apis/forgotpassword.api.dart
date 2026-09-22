import 'dart:convert';

import 'package:http/http.dart' as http;

Future<void> sendResetPasswordEmail(String email) async {
  final url = 'https://staging-w5ij.onrender.com/api/v1/auth/forgot-password';
  final body = jsonEncode({'email': email});
  print('Sending request to $url with body: $body');

  final response = await http.post(
    Uri.parse(url),
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  );

  print('Response status: ${response.statusCode}');
  print('Response body: ${response.body}');

  if (response.statusCode != 200 && response.statusCode != 201) {
    throw Exception('Failed to send reset password email');
  }
}
