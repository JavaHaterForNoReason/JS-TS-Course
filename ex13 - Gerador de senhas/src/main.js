//Permitirá que o script rode mesmo em navegadores mais antigos,
//como o IE 11, 10 e 9
import "core-js/stable";
import "regenerator-runtime/runtime";

import geraSenha from "./modules/geraSenha";
import "./assets/css/styles.css";

(function () {
  geraSenha();
})();
