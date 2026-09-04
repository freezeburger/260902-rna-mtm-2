import SplashScreen from '@/src/screens/SplashScreen';

fetch('http://10.0.2.2:8080/logs')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching logs:', error));

export default SplashScreen;
