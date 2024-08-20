import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-clientes-detalhes',
  templateUrl: './clientes-detalhes.component.html',
  styleUrls: ['./clientes-detalhes.component.css']
})
export class ClientesDetalhesComponent implements OnInit, AfterViewInit {
  @Input() cliente: any;
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog: Dialog | undefined;

  images: any[] = [];
  responsiveOptions: any[] = [];

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1024',
        numVisible: 5
      },
      {
        breakpoint: '512',
        numVisible: 3
      },
      {
        breakpoint: '140px',
        numVisible: 1
      }
    ];

    this.images = [
      {
        itemImageSrc: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/10/ODR20221012077.jpg',
        thumbnailImageSrc: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/10/ODR20221012077.jpg',
        alt: 'Image 1',
        title: 'Imagem 1'
      },
      {
        itemImageSrc: 'https://s2-oglobo.glbimg.com/Ojj_jPgT8dTjIZw95sZZgTbBIPc=/0x0:7212x4808/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/F/o/B9mmIkSfuIgRDnGUBdOg/101004667-players-of-flamengo-celebrate-with-the-trophy-after-winning-the-copa-libertadores-fina.jpg',
        thumbnailImageSrc: 'https://s2-oglobo.glbimg.com/Ojj_jPgT8dTjIZw95sZZgTbBIPc=/0x0:7212x4808/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/F/o/B9mmIkSfuIgRDnGUBdOg/101004667-players-of-flamengo-celebrate-with-the-trophy-after-winning-the-copa-libertadores-fina.jpg',
        alt: 'Image 2',
        title: 'Imagem 2'
      },
      {
        itemImageSrc: 'https://lncimg.lance.com.br/uploads/2021/02/25/6038680d52afc.jpeg',
        thumbnailImageSrc: 'https://lncimg.lance.com.br/uploads/2021/02/25/6038680d52afc.jpeg',
        alt: 'Image 3',
        title: 'Imagem 3'
      },
      {
        itemImageSrc: 'https://colunadofla.com/wp-content/uploads/2024/03/elenco-flamengo-x-fluminense-carioca-maracana.jpg',
        thumbnailImageSrc: 'https://colunadofla.com/wp-content/uploads/2024/03/elenco-flamengo-x-fluminense-carioca-maracana.jpg',
        alt: 'Image 4',
        title: 'Imagem 4'
      },
      {
        itemImageSrc: 'https://lncimg.lance.com.br/cdn-cgi/image/width=828,quality=75,fit=pad,format=webp/uploads/2019/11/23/5dd9bc3792db5.jpeg',
        thumbnailImageSrc: 'https://lncimg.lance.com.br/cdn-cgi/image/width=828,quality=75,fit=pad,format=webp/uploads/2019/11/23/5dd9bc3792db5.jpeg',
        alt: 'Image 5',
        title: 'Imagem 5'
      },
      {
        itemImageSrc: 'https://pbs.twimg.com/media/CnBveF2WAAAqX-P.jpg',
        thumbnailImageSrc: 'https://pbs.twimg.com/media/CnBveF2WAAAqX-P.jpg',
        alt: 'Image 6',
        title: 'Imagem 6'
      },
    ];
  }

  ngAfterViewInit() {
    // Acessa o DOM do modal e ajusta o scroll para o topo
    if (this.dialog) {
      this.dialog.onShow.subscribe(() => {
        const content = document.querySelector('.p-dialog-content');
        if (content) {
          content.scrollTop = 0;
        }
      });
    }
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
