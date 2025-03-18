
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAOChoFreCCBPupVR7IG-ZxzwvTlv6P9t8",
      authDomain: "studio-mademoiselle-f0510.firebaseapp.com",
      projectId: "studio-mademoiselle-f0510",
      storageBucket: "studio-mademoiselle-f0510.firebasestorage.app",
      messagingSenderId: "581494827788",
      appId: "1:581494827788:web:ceffa170cbf8d9222ef729",
      measurementId: "G-MQC0X172KD"
    };
  
    // Initialize Firebase
    var myProfile;
    var userID;
    var myEvent;
    var dancersData = {};
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    const storage = firebase.storage();
    var firstLogin = true;

    window.addEventListener("load", async function () {
      await auth.onAuthStateChanged( async function(user) {
        if (user) {
          // User is signed in.
          console.log("User is signed in:", user);
          // You can now update the UI to show the user's info
        } else {
          // No user is signed in.
          console.log("No user is signed in");
          // Redirect to login page or show a login button
          Swal.fire({title: "Welcome to Studio Mademoiselle",
            showDenyButton: true,
            //showCancelButton: true,
            //confirmButtonText: 'Email',
            denyButtonText: 'Testing',
            confirmButtonText: 'Sign in',
            //denyButtonColor: "var(--c-gray-500)",
            //cancelButtonText: 'Google',
            //cancelButtonColor: "var(--c-blue-500)",
          }).then( async function(result) {
            //console.log(result);
            if (result.isConfirmed) {
                auth.signInWithPopup(provider)
                    .then((result) => {
                        const user = result.user;
                        //userID = user.uid;
                        console.log('User signed in with Google:', user);
                        //Swal.fire('Signed in with Google successfully!', '', 'success');
                    })
                    .catch((error) => {
                        console.error('Error signing in with Google:', error);
                        Swal.fire('Error signing in with Google', error.message, 'error');
                    });

                /*Swal.fire({
                    title: 'Enter your email and password',
                    html:
                        '<input type="email" id="email" class="swal2-input" placeholder="Email">' +
                        '<input type="password" id="password" class="swal2-input" placeholder="Password">',
                    focusConfirm: false,
                    preConfirm: () => {
                        const email = Swal.getPopup().querySelector('#email').value;
                        const password = Swal.getPopup().querySelector('#password').value;
                        if (!email || !password) {
                            Swal.showValidationMessage(`Please enter email and password`);
                        }
                        return { email: email, password: password };
                    }
                }).then((loginDetails) => {
                    if (loginDetails.value) {
                        auth.signInWithEmailAndPassword(loginDetails.value.email, loginDetails.value.password)
                            .then((userCredential) => {
                                // Signed in
                                const user = userCredential.user;
                                //console.log('User signed in:', user);
                                //userID = user.uid;
                                //Swal.fire('Signed in successfully!', '', 'success');
                            })
                            .catch((error) => {
                                console.error('Error signing in:', error);
                                Swal.fire('Error signing in', error.message, 'error');
                            })
                            .catch((error) => {
                                if (error.code === 'auth/user-not-found') {
                                    // If user is not found, sign them up
                                    auth.createUserWithEmailAndPassword(loginDetails.value.email, loginDetails.value.password)
                                        .then((userCredential) => {
                                            const user = userCredential.user;
                                            console.log('User signed up and signed in:', user);
                                        })
                                        .catch((error) => {
                                            console.error('Error signing up:', error);
                                            Swal.fire('Error signing up', error.message, 'error');
                                        });
                                } else {
                                    console.error('Error signing in:', error);
                                    Swal.fire('Error signing in', error.message, 'error');
                                }
                            });
                    }
                });*/
            } else if (result.isDenied) {
                await auth.signInAnonymously()
                    .then((result) => {
                        const user = result.user;
                        //userID = "test";
                        console.log('User signed in anonymously:', user);
                        //Swal.fire('Signed in anonymously successfully!', '', 'success');
                    })
                    .catch((error) => {
                        console.error('Error signing in anonymously:', error);
                        Swal.fire('Error signing in anonymously', error.message, 'error');
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
          }
          //await setupFirebase();
          //Login and setup profile
          firstLogin = true;
          });
        }
        userID = user.uid;
        //userID = "RMETHBA9CEdhaPvLrYThM4Hv9073";
        console.log(userID);
        //if ( user.isAnonymous ) userID = "test";
        await setupFirebase();
      });
    });

    const logoutButton = document.getElementById('logoutButton');
