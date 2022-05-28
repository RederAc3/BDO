### Application created to automate internal processes for a scrap metal trading company. 
#### Help to manage waste cards in a simple and fast way in the  [BDO system](https://bdo.mos.gov.pl/)
#### File APK [here](/apk).

# 📸 Screenshots
| Login | Registration | Add API Keys | Home |
| --- | --- | --- | --- |
| <img src="./screenshots/LoginScreen.png" width="220"> | <img src="./screenshots/RegistrationScreen.png" width="220"> | <img src="./screenshots/AddAPIKeysScreen.png" width="220"> | <img src="./screenshots/HomeScreen.png" width="220"> |

| Create Card | Details Card | Cards Status | Cards List  |
| --- | --- | --- | --- |
| <img src="./screenshots/CreateCardScreen.png" width="220"> | <img src="./screenshots/DetailsCardScreen.png" width="220"> | <img src="./screenshots/CardsStatusScreen.png" width="220"> | <img src="./screenshots/CardsListScreen.png" width="220"> |

# App functions
## for KPO Card
✅ Create Card \
✅ Confirm Card \
✅ Confirm Transport \
✅ Confirm Received \
✅ Generate Confirmation \
✅ Delete Card \
✅ Withdraw Card \
✅ Correct the Card \
✅ Reject Card \
✅ Print Confirmation \
✅ Print Card

#### 🛠 ToDo 
- [x] Login
- [x] Registration
- [x] Card management
- [ ] Automated custom print server ( on RPI )
- [ ] Notification of new cards
- [ ] User custom settings
- [ ] [BDOBot](https://github.com/RederAc3/telegramBdoBot) integration
- [ ] Invoice management
 

# Setup
```
$ git clone https://github.com/RederAc3/BDO.git
$ cd BDO
$ yarn install

# for iOS
$ cd ./ios && pod install && cd ..
$ yarn run ios

# for Android
$ yarn run android

```
