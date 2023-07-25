# Robot-Control

note: The updated README information for the new version of the website is located afterwards.

### A web page for controlling a robot that features 5 buttons: 4 for navigating and 1 for stop.
### these images displays the page.
![image](https://github.com/oAmadu/Robot-Control/assets/90242708/64a03459-4e3e-417c-8d58-309a952de100)
![image](https://github.com/oAmadu/Robot-Control/assets/90242708/d894d85e-c7dd-4fa5-95fe-f4dc5a0040db)




### while this image shows an example of the database that has been connected to the webpage.
![image](https://github.com/oAmadu/Robot-Control/assets/90242708/570aa853-8cbf-42cc-9598-3936c98a8b3d)

data are stored through: controller.php and script.js


The SQL code required to build a table for storing the commands is as follows.
``` 
CREATE TABLE `commands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `command` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 ```

---
## Path Drawing Feature
In the "path-drawing" branch, a canvas has been added to the page to show the path taken by the robot. The canvas can be toggled on and off using a checkbox on the page.


### these images displays the page with the path
![image](https://github.com/oAmadu/Robot-Control/assets/90242708/8622315f-35c7-4259-b9d1-ed187525f5c0)
### as shown in the picture, there's a checkbox that shows/hides the canvas


### and here's a picture of the table paths in the database where the paths are stored
![image](https://github.com/oAmadu/Robot-Control/assets/90242708/5393b287-4966-4cb2-9bee-2eb877a33523)

data are stored through: store_path.php and script.js


