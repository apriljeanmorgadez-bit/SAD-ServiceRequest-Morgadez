ICT Service Request Management System

Laboratory Exercise 3 – Systems Analysis and Design (SAD)

Student: April Jean Morgadez
Section: BSIT- 3A 
GitHub Repository: https://github.com/[your-username]/SAD-ServiceRequest-[Lastname]
Live System: https://[your-username].github.io/SAD-ServiceRequest-[Lastname]/



1. Problem Statement

The university's ICT office currently receives technical support requests through verbal reports, text messages, and social media, so there is no single place where these concerns are recorded. Because of this, some requests get forgotten, duplicated, or never get followed up on. There is also no easy way for the ICT staff to check how many requests are pending, in progress, or already completed. This project is a simple web-based Service Request Management System that lets an authorized user log in, submit and manage requests (computer repair, software installation, network problems, printer problems, account/access concerns, and other ICT issues), and monitor them through a small dashboard.

2. Actors
   
System User / ICT Personnel


4. Use Case Diagram

<img width="551" height="761" alt="Use Case" src="https://github.com/user-attachments/assets/358ce4d9-b06f-465c-85e4-3b47eddd5b65" />

4. Simple ERD


<img width="1285" height="717" alt="Simple ERD" src="https://github.com/user-attachments/assets/5c17b985-2929-46f9-b539-d954d7c3f2b1" />






6. Requirements Traceability Matrix


Requirements Traceability Matrix.

Req. ID             	Requirement                   	System Feature                     	Test                        
FR-01              	User can log in                  Login Page                       	TC-01                      
FR-02             	User can create request          Request Form                      	TC-02                       
FR-03              	User can view requests           Request Table                       TC-03                      
FR-04              	User can update request          Edit Function                       TC-04                      
FR-05 	            User can delete request          Delete Function                     TC-05
FR-06 	            User can search                  Search Function                   	TC-06
FR-07 	            User can filter                  Filter Function                   	TC-07
FR-08 	            System displays summaries      	 Dashboard 	                        TC-08


   
8. Functional Testing

Test ID                            Test Scenario 	                              Expected Result                                    Result

TC-01                          	Login using valid account 	                     Dashboard appears                                   PASS
TC-02                         	Submit valid request                          	Request saved                                       PASS
TC-03                         	Display requests                              	Existing records appear                             PASS
TC-04                         	Modify request                                 	Changes saved                                       PASS
TC-05                         	Delete request                                	Confirmation appears and record is removed          PASS
TC-06 	                        Search requester                               	Matching records displayed                          PASS
TC-07                         	Filter Pending requests                       	Only Pending records displayed                      PASS
TC-08 	                        Open deployed URL                             	Application loads online                            PASS
