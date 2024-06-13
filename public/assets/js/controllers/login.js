let Login = {
    module: () => {
        return "login";
    },
    
    moduleApi: () => {
        return "api";
    },

    signIn: (elm, e) => {
      // console.log("ini nilai e:"+e)
        e.preventDefault();
        if (validation.run()) {
            let params = {};
            params.email = $('#username').val();
            params.password = $('#password').val();

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Login.moduleApi()) + "login",

                error: function (resp) {
                    message.errorMessage(resp.responseJSON.error);
                    message.closeLoading();
                },

                beforeSend: () => {
                 message.loadingProses('Proses Verifikasi....');
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.token != '') {
                        message.successMessage(`Login Sukses`);
                        var reload = function () {
                            window.location.href = url.base_url('data/user_absen') + "add";
                        };                        
                        let db = Database.init();                        
                        db.get('token').then(function(doc) {
                            return db.put({
                              _id: 'token',
                              _rev: doc._rev,
                              title: `${resp.token}`
                            });
                          }).then(function(response) {
                            // handle response
                            // console.log('response', response);
                          }).catch(function (err) {
                            if(err.name == 'not_found'){
                                return db.put({
                                    _id: 'token',
                                    title: `${resp.token}`
                                  });
                              }
                          });

                        db.get('user_login').then(function(doc) {
                            return db.put({
                              _id: 'user_login',
                              _rev: doc._rev,
                              title: `${params.email}`
                            });
                          }).then(function(response) {
                            // handle response
                            // console.log('response', response);
                          }).catch(function (err) {
                            if(err.name == 'not_found'){
                                return db.put({
                                    _id: 'user_login',
                                    title: `${params.email}`
                                  });
                              }
                          });
                          setTimeout(reload(), 2000);
                    } else {
                        message.errorMessage(resp);
                    }
                }
            });
        }
    },

    tesdb:()=>{
        let db = Database.init();        
        console.log('db', db);
        db.get('token').then(function(doc) {
            // console.log('doc', doc.title);
            // return db.put({
            //   _id: 'token',
            //   _rev: doc._rev,
            //   title: `"TES TOKEN"`
            // });
          }).then(function(response) {
            // handle response
            console.log('response', response);
          }).catch(function (err) {
              if(err.name == 'not_found'){
                return db.put({
                    _id: 'token',
                    title: `"TES TOKEN"`
                  });
              }
            console.log(err);
          });
    },

    setAsRoles:(elm, e)=>{
      e.preventDefault();
      let params = {};
      params.akses = $(elm).attr('data-id');

      $.ajax({
          type: 'POST',
          dataType: 'json',
          data: params,
          url: url.base_url(Login.moduleApi()) + "setAsRoles",

          error: function (resp) {
              message.errorMessage(resp.responseJSON.error);
              message.closeLoading();
          },

          beforeSend: () => {
           message.loadingProses('Proses Pengambilan Data....');
          },

          success: function (resp) {
              message.closeLoading();
              if (resp.is_valid != '') {
                  var reload = function () {
                      window.location.href = url.base_url('account') + "profile";
                  };
                  setTimeout(reload(), 2000);
              } else {
                  alert(resp);
              }
          }
      });
    }
};
