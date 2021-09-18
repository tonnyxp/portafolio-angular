import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  appURL = 'https://angular-html-mx-default-rtdb.firebaseio.com';

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {
    const promise = new Promise((resolve, reject) => {
      this.http.get('https://angular-html-mx-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((res: any) => {
          this.productos = res;
          this.cargando = false;
          resolve(res);
      });
    });
    return promise;
  }

  getProducto(id: string) {
    return this.http.get(`${this.appURL}/productos/${id}.json`)
  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar despues de tener los productos
        // Aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }

    });
  }

}
