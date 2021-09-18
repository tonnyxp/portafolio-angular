import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public productoService: ProductoService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      // console.log(params['termino']);
      this.productoService.buscarProducto(params['termino']);
    });
  }

}
