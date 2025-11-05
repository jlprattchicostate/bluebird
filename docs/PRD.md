# Bluebird App – Project Requirements Document (PRD)

## 1. Overview

**Project Name:** Bluebird  
**Prepared by:** Jeff Pratt 
**Last Updated:** November 2025  

### Purpose
Bluebird is a mobile app designed for skiers and snowboarders to make informed, safe, and enjoyable trip decisions based on live weather, snow, and road conditions across multiple resorts. The app merges **official data** (weather, snow, and road reports) with **community insights** (posts, photos, and tips).

### Vision
To become the go-to platform for real-time mountain conditions and community-driven updates — helping riders choose the best resort each day with confidence and ease.

---

## 2. Goals & Strategy

### Primary Goal
Deliver **accurate, timely mountain weather and road updates** to users, allowing them to make safe and optimized travel plans.

### Supporting Objectives
- Provide **two daily update cycles** (morning and evening) summarizing conditions across resorts.  
- Enable a **community-driven experience** where users can share firsthand updates, photos, and advice.  
- Allow **simple comparisons** between resorts to highlight snow depth, traffic, and vibe.  
- Support **direct communication** between riders for coordination and meetups.

### Success Metrics
- Daily active users (DAU)  
- User retention over 30 days  
- Engagement in community posts and messages  
- Accuracy ratings of weather and road data  
- Average time to decide on a resort (self-reported or inferred)

---

## 3. User Constituencies

### Primary Users
- **Skiers and snowboarders (ages 18–40)** of all experience levels.
- Subgroups include:
  - **Beginners:** Want clear, safe recommendations and less-crowded options.  
  - **Experienced riders:** Focus on snow depth, trail conditions, and advanced terrain.
  - **Resort staff/local contributors:** Share local insights and updates.

### User Goals
- Quickly determine which resort to visit.
- Receive timely alerts about changing conditions.
- Connect with others for carpools or social rides.
- Contribute community updates to help others.

---

## 4. Usage Context

- **Device:** Mobile-first (iOS and Android)  
- **Environment:** At home (trip planning), on the road (en route), or at the resort.  
- **Connectivity:** Requires internet/data connection; not intended for offline use.  
- **Performance Needs:** Must function under low connectivity (mountain regions).  
- **Design Style:** Familiar, intuitive tab navigation similar to Instagram or Reddit.

---

## 5. Core Features

### 5.1 Home Dashboard
- Morning and evening weather + snow updates.  
- Resort summary cards with key metrics (snowfall, temperature, open trails).  
- Trending posts on current conditions.  
- Push notifications for new updates and closures.  

### 5.2 Weather & Road Updates
- Aggregates official weather reports and road conditions.  
- Alerts for road closures, snow advisories, and travel warnings.  
- Integration with public weather APIs and transportation sources.

### 5.3 Check Conditions
- Displays live data for individual resorts:  
  - Snowfall totals  
  - Temperature and visibility  
  - Current lift or trail status  
- Allows users to mark resorts as “favorites” for quick access.  

### 5.4 Community Feed
- User-generated posts with photos, captions, and short updates.  
- “Vibe” reports (crowds, wait times, atmosphere).  
- Report functionality for false or unsafe information.  
- Moderation tools to ensure accuracy and trustworthiness.  

### 5.5 Compare Resorts
- Side-by-side comparison of:  
  - Snow depth and recent snowfall  
  - Wait times (user-reported)  
  - Road and parking status  
- Helps users choose the optimal resort each day.

### 5.6 User Profiles
- Basic profiles with name, interests, and experience level.  
- List of favorite resorts and posted updates.  
- Follow other users and view shared content.

### 5.7 Messages & Group Chats
- One-on-one or group chat for planning trips.  
- Coordinate carpools or riding groups.  
- Option to share resort updates privately among friends.

---

## 6. User Stories

1. **Check Snow Depth:** As a skier, I want to check live snow depth and temperature to decide where to go.  
2. **Road Safety:** As a snowboarder, I want official weather and road reports to plan safe travel.  
3. **Timely Notifications:** As a user, I want morning/evening alerts to prepare gear and timing.  
4. **Community Sharing:** As a member, I want to post photos and tips for others to explore.  
5. **Compare Resorts:** As a rider, I want to compare conditions to pick the best option.  
6. **Coordinate Trips:** As a user, I want to message others to plan carpools or meetups.  
7. **Personal Profiles:** As a user, I want to create a profile showing my riding interests.  
8. **Moderation:** As a community member, I want to report false or unsafe posts.  
9. **Trending Updates:** As a skier, I want to see trending posts about weather and road status.  
10. **Favorites:** As a snowboarder, I want to save my favorite resorts for quick access.  

---

## 7. Exclusions

- Online booking or purchasing (tickets, rentals, or lodging)  
- Professional avalanche or emergency alerts  
- GPS-based live tracking or user location sharing  
- Offline functionality  
- In-app purchases, payments, or transactions  

---

## 8. Design Notes

According to the *feature chart on page 5* of the original specification, Bluebird organizes functionality into **five main navigation tabs**:
1. **Home Dashboard** – Weather/snow updates and alerts  
2. **Weather Updates** – Access to official condition reports  
3. **Check Conditions** – Resort-level details  
4. **Community Feed** – Posts, trending updates, and moderation tools  
5. **User Profile** – Personal info and connections  

Supporting modules:  
- **Messages** (coordinate trips, create groups)  
- **Compare Resorts** (snowfall, wait times, parking comparison)

---

## 9. Technical Requirements

### Data Sources
- Public and third-party APIs for weather and transportation.
- Internal backend to aggregate resort-specific data.
- Cloud-hosted image and text storage for community posts.

### Platform Requirements
- Native or cross-platform (e.g., React Native or Flutter).  
- Push notifications (Firebase or APNs).  
- Cloud-hosted database (e.g., AWS DynamoDB or Firestore).  

### Security
- User authentication (OAuth or social login).  
- Moderation queue for user reports.  
- Encrypted storage of user messages.

---

## 10. Future Enhancements (Post-MVP)
- In-app trip planning or itinerary suggestions.  
- Integration with resort webcams.  
- Gamified user badges for contributors.  
- Map view of all resorts with color-coded conditions.  

---

## 11. Launch Scope (MVP)
- Home Dashboard  
- Weather & Road Updates  
- Check Conditions  
- Community Feed (with reporting)  
- Compare Resorts  
- User Profiles  
- Messaging  
