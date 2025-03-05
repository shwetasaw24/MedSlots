import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
// import 'screens/home_screen.dart'; // Your main UI screen

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Doctor Appointment App')),
        body: Center(child: Text('Firebase Initialized!')),
        // theme: ThemeData(primarySwatch: Colors.blue),
        // home: HomeScreen(), // Navigate to Home Screen
      ),
    );
  }
}
