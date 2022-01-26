# Kalinga Business Herald
## _API Layer Notes_

## Create a super admin password
    - const { genSaltSync, hashSync, compareSync } = require("bcrypt");
    - const salt = genSaltSync(10);
    - password = hashSync(password);
    - DB Role value: 0

- Admin can create other admin/non admin users