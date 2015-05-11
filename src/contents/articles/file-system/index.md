---
title: File System
author: Josh Brunner
date: 2014-05-29
template: article.jade
---

The final project in my operating systems class at UW was to implement a complete Unix-like file system. I was on a team of five other students and I was responsible for implementing the directory which managed the actual files. For this project, a file was just a string of characters that spelled some word. See each section in this document to learn about the specific functions that came together to build the file system.

---

* [GitHub Repository](https://github.com/brunnerjosh/file-system)
* [Project Specification](http://courses.washington.edu/css430/prog/project.html)

---

# Superblock Specification
The SuperBlock class is a component of the file system implemented in the CSS430 final project in ThreadOS. A SuperBlock is a block of metadata that describes the file system and its components. SuperBlock reads the physical SuperBlock from the disk, validates the health of the disk and provides methods for identifying free blocks, adding blocks to the free list, and writing back to disk the contents of SuperBlock. If validation fails, SuperBlock will format the disk (restored it to an empty file system state) and write a new SuperBlock to disk.

# Inode Specification
The main purpose of Inode is to describe a file. It holds 12 pointers of the index block (11 direct and 1 indirect). Inode includes the length of the corresponding file, the number of file table entries that point to the inode, and a flag to indicate used or not, plus additional status values. A total of 16 inodes can be stored in a block.

# Directory Specification
The main purpose of directory is to contain and manage the “files” that are being dealt with. Directory accomplishes this by means of creating two arrays.

One array is a 1D int array called “fsizes” and its main purpose is to contain the sizes of these files in their respective  locations. fsizes can be visualized as a simple list of numbers representing the different sizes of file stored in the fnames array. Upon Directory’s initialization, the constructor is handed an int called “maxInumber” which is the maximum stored files that the fsizes array will hold. The second array is a 2D char array called “fnames” and its main purpose is to contain the “files” that the directory is holding. An example file could be something like “hello” and its size would be 5. The sizes are determined by how many chars are taken up to hold the word. Since “hello” has 5 characters, fsizes would hold the number 5 while fnames would hold each character (“h”, “e”, “l”, “l”, “o”) of the string.

The Directory gets broken up into smaller functions to do things like reading data from a byte array into the directory and writing from the directory back to the byte array. The following table provides a brief description of what the smaller functions do, listed by name. Please see the actual source code of Directory.java for line-by-line commenting.

# FileTable Specification
File (Structure) Table is a class which represent the set of file table entries. Each file table entry represents one file descriptor. The main purpose of this class is to create a new file table entry when it is required and then add that to the Vector of file table entry. It removes the file table entry from Vector when it is freed.

# FileSystem Specification
The file system class is responsible for performing all of the operations on disk. It hides all of the implementation details from users by providing a list of operations which users can directly use. The class implements all the basic functions of a file system as described in lecture, and makes appropriate calls to the components of our system to carry out fundamental actions like format, open, write, read, delete, seek, and close. The file system can be viewed as an API for other files or users to run commands against to access the file system and its contents. The file system has the responsibility of instantiating the other classes that compose our solution.

# Results
Our completed file system was tested against the professor's `Test5` test program. Here are the results:

![Test Results](https://raw.githubusercontent.com/brunnerjosh/file-system/master/images/test-results.jpg)

# Assumptions
Our assumptions in design and implementation are related to the assignment documents provided, namely the powerpoint slides, the pdf document, and the assignment page. We operated under the assumption that the functionality or specifications provided in the assignment are sufficient for the OS and users’ needs for file system control. We assumed that all access to files and commands are legitimate, regardless of source, and did not require validation or protection. Additionally, we assumed that file system interaction and instantiation of file system are controlled by test files. The user does not require direct access via the shell and it is sufficient to provide disk commands through compiled Java tests.

# Performance & Functionality
As to performance, our implementation performed similarly to the provided .Class files that were developed with ThreadOS. Our observations are qualitative rather than quantitative as the provided test did not include timing functions and using an external source of timing would be insufficient as it could not account for the performance of and interference from the shared lab machines. Like the provided .class files our implementation passed all build validation tests in Test5, and provided identical output as evidenced in the screenshot provided in section 7.0. Additionally, we validated each and every file we created by including them with the precompiled ThreadOS implementation one at a time in isolation. Each file we created to fulfill the requirements of the assignment was validated by completing all portions of the provided test class. For a more complete discussion of functionality, please refer to the above sections detailing the description of all classes and methods implemented by our group.

# Limitations
One important limitation on the performance in our implementation of the file system is the fact that the original version of each inode is written to the disk every time it changes, in order to keep them consistent. A possible solution would be keep them in memory and share single instance across all threads. Behaving like a cache, where writes to disk are not necessary unless memory is required, has demonstrated exceptionally better performance in previous labs.  Most disk systems, both solid state and disk-based, have some manner of disk caching implemented to improve their performance. We could emulate an an on disk cache with system memory, as the size of the disk in ThreadOS is dwarfed by the amount of available physical memory. In memory, inodes would be kept in an array and saved to disk only when necessary. We might use second chance algorithm, to make sure the hit ratio would be high.

In addition, there are few design issues with current implementation. The first one relates to the limited number of inodes on disk which is 64 (per specification). If we would like to create more,  we won’t be able. This can be an issue in real file system which should be able to handle thousands of files dynamically. Such an artificially low hard limit on the number of inodes simplified debugging and understanding of disk behavior, but is in stark contrast to modern file system implementations.

Another issue we observed relates to having only 11 direct and 1 indirect pointers in each inode. The direct pointers point to the block-disk address where the given block can be found. The indirect pointer points to the indirect block. Those solution is very reasonable for files which size do not exceed more than 11 blocks, since it allows direct access to them. However, when the files is large, the indirect pointer has to be used. In that case, the access time is longer since we have to do additional look ups for the disk block which indirect pointer points to. Since we do not have a full understanding of the files our system should be designed for, the solution implemented is adequate. However, other indexing implementations can be better suited for specific applications.

A possible solution (alternative) for that would be keeping blocks’ addresses in the linked list. The inode would keep the pointer to the first allocated block for the given file and then each block will keep a pointer to the next block in that file. However, this approach would require to allocate some additional memory in each block for the pointer. Another issue could occur in the case of losing the pointer. In that case the block would be lost because it will be neither in the free block’s list or the content of the file (double-linked lists can solve this problem, but require additional overhead).

A final limitation on our system is the complete lack of a permission or protection system for the disk and the file system. In a production environment, it is a demonstrated best practice to provide enhanced access control to the file system--protecting files and the system from unauthorized or inappropriate access. Most methods are declared public in our implementation, and any method holding a reference to the file system classes can perform any function--even those that are normally reserved for elevated privileges.
