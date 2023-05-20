export interface Usuario {
  usuario : string,
  clave : string
}

export interface UsuarioId extends Usuario{
  id : number;
}

export interface UsuarioParcial extends Partial<Usuario>{

}
