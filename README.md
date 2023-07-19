# Robot-Control

### A web page for controlling a robot that features 5 buttons: 4 for navigating and 1 for stop.
### these images displays the page.
![image](https://github.com/oAmadu/Robot-Control/assets/90242708/64a03459-4e3e-417c-8d58-309a952de100)
![image](https://github.com/oAmadu/Robot-Control/assets/90242708/d894d85e-c7dd-4fa5-95fe-f4dc5a0040db)




### while this image shows an example of the database that has been connected to the webpage.
![image](https://github.com/oAmadu/Robot-Control/assets/90242708/570aa853-8cbf-42cc-9598-3936c98a8b3d)


The SQL code required to build a table for storing the commands is as follows.
``` 
CREATE TABLE `commands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `command` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 ```



