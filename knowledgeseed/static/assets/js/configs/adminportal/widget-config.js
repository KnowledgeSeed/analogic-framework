/* global app */'use strict';app.widgetConfig = {
adminPortalMain : 
  {
  id:'adminPortalMain', 
  type:PageWidget,
    widgets:[
                                                                                                                                                                                                  
      {
      id:'adminPortalTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                     width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'80%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalTitleGridTitle1', 
         type:TextWidget,
         title:'Admin Portal',
                                                                                          titleFontSize:40,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalTitleGridUserCell', 
        type:GridCellWidget,
                                                alignment:'center-right',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalUserGridButton', 
         type:ButtonWidget,
         label:'Oravecz Tamas',
                  action:'',
                           icon:'icon-profile',
                                                                                          skin:'userpanel',
                                                               }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalMainMenuGrid', 
   type:GridWidget,
      marginLeft:'30',
      marginTop:'50',
               widgets:[
                                                                                                                                                                                                                                                                              
    {
    id:'adminPortalMainMenuGridRow1', 
    type:GridRowWidget,
                                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalMainMenuGridCell1_1', 
     type:GridCellWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalMainMenuGridCell1_1Grid', 
      type:GridWidget,
                                                      widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalMainMenuGridCell1_1GridRow1', 
       type:GridRowWidget,
                                                                             widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalMainMenuGridCell1_1GridRow1Cell', 
        type:GridCellWidget,
                                                                listen:[{"event":"launch.adminPortalUserGridButton.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalMainMenuGridCell1_1Button', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-6',
                                                                                          skin:'appmainmenu',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalMainMenuGridCell1_1GridRow2', 
       type:GridRowWidget,
                                          alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalMainMenuGridCell1_1GridRow2Cell', 
        type:GridCellWidget,
                                                alignment:'center-center',
                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalMainMenuGridCell1_1Text', 
         type:TextWidget,
         title:'Admin Portal',
                                             marginTop:'20',
                                                                                                                     }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalSiteMenu', 
        type:ContainerWidget,
        anchor:'adminPortalUserGridButton',
        anchorVisible:true,
        anchorOnClick:false,
        visible:false,
        width:'160',
        bgScrollable:true,
                                                        fixed:false,
        height:'130',
        behaviour:'popup',
        pinned:false,
        position:'bottom',
                bgColor:'#fff',
        skin:'withborder',
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSiteMenuButton', 
         type:ButtonWidget,
         label:'Application',
                  action:'',
                                                                        marginBottom:'10',
                                             skin:'userpanelbutton',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalSiteMenuApplications', 
        type:ContainerWidget,
        anchor:'adminPortalUserGridButton',
        anchorVisible:false,
        anchorOnClick:false,
        visible:false,
        width:'160',
        bgScrollable:true,
                                                        fixed:false,
        height:'220',
        behaviour:'popup',
        pinned:false,
        position:'bottom',
                bgColor:'#fff',
        skin:'withborder',
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSiteMenuApplicationsBack', 
         type:ButtonWidget,
         label:'Application',
                  action:'',
                           icon:'icon-chevron-left',
                                             marginBottom:'10',
                                             skin:'userpanelbutton',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalSiteMenuApplication1', 
         type:ButtonWidget,
         label:'Roche CPU UI',
                  action:'',
                           icon:'icon-icon-1',
                                             marginBottom:'10',
                                             skin:'userpanelbutton',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalSiteMenuApplication2', 
         type:ButtonWidget,
         label:'App2',
                  action:'',
                           icon:'icon-column-age',
                                             marginBottom:'10',
                                             skin:'userpanelbutton',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalSiteMenuApplication3', 
         type:ButtonWidget,
         label:'App3',
                  action:'',
                           icon:'icon-icon-4',
                                             marginBottom:'10',
                                             skin:'userpanelbutton',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
adminPortalWidgetCatalog : 
  {
  id:'adminPortalWidgetCatalog', 
  type:PageWidget,
    widgets:[
                                                                                                                                                                                                  
      {
      id:'adminPortalWidgetCatalogTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                     width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'80%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogTitleGridTitle1', 
         type:TextWidget,
         title:'Widget Catalog',
                                                                                          titleFontSize:40,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogTitleGridUserCell', 
        type:GridCellWidget,
                                                alignment:'center-right',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogUserGridApplicationDropBox', 
         type:DropBoxWidget,
                                                      listen:[{"event":"bodyReady","method":"refreshWithState"}],
                           marginRight:'20',
                                                                                          skin:'applist'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogUserGridButton', 
         type:ButtonWidget,
         label:'Oravecz Tamas',
                  action:'',
                           icon:'icon-profile',
                                                                                          skin:'userpanel',
         listen:[{"event":"choose.adminPortalWidgetCatalogUserGridApplicationDropBox.finished","method":"refresh"}],
                                                      }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      {
      id:'adminPortalWidgetCatalogFilterGrid', 
      type:GridWidget,
            marginLeft:'30',
            marginTop:'50',
                              widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogFilterGridRow1', 
       type:GridRowWidget,
                                                                             widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogFilterGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogFilterGridParentDropBox', 
         type:DropBoxWidget,
         title:'Parent Filter',
         titleVisible:true,
                                    listen:[{"event":"launch.adminPortalWidgetCatalogFilterGridRemoveFilter.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
         visible:true,
                                             width:'300',
                                                               skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogFilterGridCell2', 
        type:GridCellWidget,
                marginLeft:'20',
                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogFilterGridTypeDropBox', 
         type:DropBoxWidget,
         title:'Widget Type',
         titleVisible:true,
                                    listen:[{"event":"launch.adminPortalWidgetCatalogFilterGridRemoveFilter.finished","method":"refresh"}],
         visible:true,
                                             width:'300',
                                                               skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogFilterGridCell3', 
        type:GridCellWidget,
                marginLeft:'50',
                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogFilterGridRemoveFilter', 
         type:ButtonWidget,
         label:'Remove Filter',
                  action:'',
                                                               marginTop:'18',
                                                      skin:'analogicmain',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogFilterGridCell4', 
        type:GridCellWidget,
                marginLeft:'20',
                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogFilterGridRefresh', 
         type:ButtonWidget,
         label:'Refresh Table',
                  action:'',
                                                               marginTop:'18',
                                                      skin:'analogicmain',
                                                               }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      {
      id:'adminPortalWidgetCatalogControlGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
      marginTop:'50',
            width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogControlGridRow_01', 
       type:GridRowWidget,
                                                 width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogControlGridRow_01_01', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogSearchBox', 
         type:TextBoxWidget,
                                                                                                   width:'400',
         skin:'searchbox',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalWidgetCatalogControlGridRow_01_02', 
        type:GridCellWidget,
                                                alignment:'bottom-center',
        width:'40%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogPagingButton1', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-chevron-left',
                           marginRight:'10',
                                             fontColor:'#007aff',
                  skin:'analogicpopupicon',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
            id:'adminPortalWidgetCatalogPageNumber', 
            type:TextWidget,
            title:'1',
            titleFontColor:'#007aff',
           // listen:[{"event":"launch.adminPortalWidgetCatalogPagingButton2.finished","method":"refresh"}, {"event":"launch.adminPortalWidgetCatalogPagingButton1.finished","method":"refresh"}]
         } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogPagingButton2', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-chevron-right',
                  marginLeft:'10',
                                                      fontColor:'#007aff',
                  skin:'analogicpopupicon',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogControlGridRow_01_03', 
        type:GridCellWidget,
                                                alignment:'center-right',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogPagingDropBox', 
         type:DropBoxWidget,
                                                                                                            width:'80',
                                                               skin:'analogicdropbox'}
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["Widget ID","Widget","WidgetType","Parent Widget"],
        searchField:false,
        checkbox:false,
        visible:true,
        columnWidths:["15%","30%","15%","15%"],
                        fadeOutNum:10,
        listen:[
            {"event":"choose.adminPortalWidgetCatalogFilterGridParentDropBox.finished","method":"refresh"},
            {"event":"choose.adminPortalWidgetCatalogFilterGridTypeDropBox.finished","method":"refresh"},
            {"event":"launch.adminPortalWidgetCatalogAddNewGridButton.finished","method":"refreshWithState"},
            {"event":"launch.adminPortalWidgetCatalogAddNewGridCloneButton.finished","method":"refreshWithState"},
            {"event":"launch.adminPortalWidgetCatalogAddNewGridCloneAllButton.finished","method":"refreshWithState"},
            {"event":"launch.adminPortalWidgetCatalogDeleteWarnGridButton.finished","method":"refreshWithState"},
            {"event":"launch.adminPortalWidgetCatalogFilterGridRefresh.finished","method":"refreshWithState"},
            {"event":"launch.adminPortalWidgetCatalogFilterGridRemoveFilter.finished","method":"refresh"},
            {"event":"choose.adminPortalWidgetCatalogUserGridApplicationDropBox.finished","method":"refreshWithWaitingForEvent","parameters":["rendered.adminPortalWidgetCatalogUserGridButton"]},
            {"event":"writeEnd.adminPortalWidgetCatalogSearchBox.finished","method":"refresh"},
            {"event":"choose.adminPortalWidgetCatalogPagingDropBox.finished","method":"refresh"},
            {"event":"launch.adminPortalWidgetCatalogPagingButton2.finished","method":"refreshWithWaitingForEvent","parameters":["rendered.adminPortalWidgetCatalogPageNumber"]}, 
            {"event":"launch.adminPortalWidgetCatalogPagingButton1.finished","method":"refreshWithWaitingForEvent","parameters":["rendered.adminPortalWidgetCatalogPageNumber"]}
        ],
        isInBox:false,
        leftActionsLength:1,
        rightActionsLength:2,
                        marginLeft:'30',
        marginRight:'30',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalWidgetCatalogHorizontalTableAdd', 
         type:ActionButtonRowWidget,
         action:'choose',
         align:'left',
         position:1,
         icon:'icon-add-circle'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
         {
         id:'adminPortalWidgetCatalogHorizontalTableEdit', 
         type:ActionButtonRowWidget,
         action:'edit',
         align:'right',
         position:1,
         icon:'icon-main-settings'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
         {
         id:'adminPortalWidgetCatalogHorizontalTableDelete', 
         type:ActionButtonRowWidget,
         action:'open',
         align:'right',
         position:2,
         icon:'icon-trash'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
     {
     id:'adminPortalWidgetCatalogContainer', 
     type:ContainerWidget,
               anchorOnClick:false,
          width:'100%',
     bgScrollable:true,
     closeBtn:false,
                              fixed:true,
     height:'70',
     behaviour:'swipe',
     pinned:true,
     position:'bottom',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                      
      {
      id:'adminPortalWidgetCatalogContainerGrid', 
      type:GridWidget,
                              marginBottom:'10',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogContainerGridRow', 
       type:GridRowWidget,
                                   marginBottom:'10',
       alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogContainerGridCell0', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridButton0', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-column-position',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogContainerGridCell1', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridButton1', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-main-financials-off',
                                                                                          skin:'mainmenuon',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogContainerGridCell4', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridButton4', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-settings',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogContainerGridCell5', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridButton5', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-history',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogContainerGridCell6', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridButton6', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-planning',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogContainerGridCell7', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridButton7', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-jump',
                                                                                          skin:'mainmenu',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogContainerGridRow2', 
       type:GridRowWidget,
                                          alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogContainerGridCell02', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridText0', 
         type:TextWidget,
         title:'Main Menu',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogContainerGridCell12', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridText1', 
         type:TextWidget,
         title:'Widget Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#007aff',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogContainerGridCell42', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridText4', 
         type:TextWidget,
         title:'System Config',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogContainerGridCell52', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridText5', 
         type:TextWidget,
         title:'Events And Logs',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogContainerGridCell62', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridText6', 
         type:TextWidget,
         title:'Applications',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogContainerGridCell72', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogContainerGridText7', 
         type:TextWidget,
         title:'Deployment',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
   {
   id:'adminPortalWidgetCatalogAddNewContainer', 
   type:ContainerWidget,
            visible:false,
   width:'780',
   bgScrollable:true,
                        height:'600',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
   skin:'scrollable',
   widgets:[
                                                                                                                                                                                                                                          
         {
         id:'adminPortalWidgetCatalogAddNewTitle', 
         type:TextWidget,
         title:'Parent Widget',
         body:'Name of parent',
         listen:[{"event":"choose.adminPortalWidgetCatalogHorizontalTable.finished","method":"refresh"}],
         marginLeft:'20',
                  marginTop:'20',
         marginBottom:'30',
         width:'40000%',
                           titleFontSize:20,
         titleFontColor:'#007aff',
                  bodyFontSize:'18',
                                             } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogAddNewSegmented', 
        type:SegmentedControlWidget,
        visible:true,
        marginLeft:'20',
        marginRight:'20',
        marginTop:'20',
        margintBottom:'20',
        width:'720',
                skin:'analogic',
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewSegmentedTab1', 
         type:SegmentedControlItemWidget,
         label:'Create New',
         action:'segmentedControlTab1',
         selected:true,
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
         {
         id:'adminPortalWidgetCatalogAddNewSegmentedTab2', 
         type:SegmentedControlItemWidget,
         label:'Clone',
         action:'segmentedControlTab2',
                                                                        } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
         {
         id:'adminPortalWidgetCatalogAddNewSegmentedTab3', 
         type:SegmentedControlItemWidget,
         label:'Clone All',
         action:'segmentedControlTab3',
         selected:false,
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    {
    id:'adminPortalWidgetCatalogAddNewGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogAddNewGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridElementName', 
         type:TextBoxWidget,
         title:'New Widget Name',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
         {
         id:'adminPortalWidgetCatalogAddNewGridPosition', 
         type:TextBoxWidget,
         title:'New Widget Position',
                                                      marginLeft:'40',
                  marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalWidgetCatalogAddNewGridRow4', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridType', 
         type:DropBoxWidget,
         title:'Widget Type',
         titleVisible:true,
         multiSelect:false,
                                                               marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridUserSpec', 
         type:DropBoxWidget,
         title:'User Specific',
                                                               marginLeft:'40',
                  marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogAddNewGridRow4_5', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridColumnNum', 
         type:TextBoxWidget,
         title:'Column Number',
                           listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridType.finished","method":"refresh"}],
                                             marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
         {
         id:'adminPortalWidgetCatalogAddNewGridRowNum', 
         type:TextBoxWidget,
         title:'Row Number',
                           listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridType.finished","method":"refresh"}],
         visible:true,
                  marginLeft:'40',
                  marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
     {
     id:'adminPortalWidgetCatalogAddNewGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetCatalogAddNewGridButtonGrid', 
      type:GridWidget,
                                    width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogAddNewGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogAddNewGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridButton', 
         type:ButtonWidget,
         label:'Create Widget',
                  action:'',
                                                               marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogAddNewGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                                             marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    {
    id:'adminPortalWidgetCatalogAddNewGridClone', 
    type:GridWidget,
    visible:false,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneElementName', 
         type:TextBoxWidget,
         title:'New Widget Name',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
         {
         id:'adminPortalWidgetCatalogAddNewGridClonePosition', 
         type:TextBoxWidget,
         title:'New Widget Position',
                                                      marginLeft:'40',
                  marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridSourceApplication', 
         type:DropBoxWidget,
         title:'Source Application',
         titleVisible:true,
         multiSelect:false,
                                                               marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridChevron', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-chevron-right',
                  marginLeft:'15',
         marginRight:'15',
         marginTop:'50',
                                                      skin:'analogicpopupicon',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalWidgetCatalogAddNewGridSourceWidget', 
         type:DropBoxWidget,
         title:'Source Widget',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridSourceApplication.finished","method":"refresh"},{"event":"launch.adminPortalWidgetCatalogAddNewGridButton.finished","method":"refresh"},{"event":"launch.adminPortalWidgetCatalogAddNewGridCloneButton.finished","method":"refresh"},{"event":"launch.adminPortalWidgetCatalogAddNewGridCloneAllButton.finished","method":"refresh"}],
                                    marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneRow6', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridContent', 
         type:DropBoxWidget,
         title:'Content',
         titleVisible:true,
         multiSelect:true,
                  items:[{"name":"widget-config"},{"name":"event-map"},{"name":"data repository"}],
         listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridSourceApplication.finished","method":"refresh"}],
                                    marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'multiselect'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneParent', 
         type:TextWidget,
         title:'',
                                                                                                                                                                  }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalWidgetCatalogAddNewGridCloneRow7', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetCatalogAddNewGridCloneButtonGrid', 
      type:GridWidget,
                                    width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogAddNewGridCloneButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneButton', 
         type:ButtonWidget,
         label:'Clone Widget',
                  action:'',
                                                               marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                                             marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    {
    id:'adminPortalWidgetCatalogAddNewGridCloneAll', 
    type:GridWidget,
    visible:false,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneAllRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllSearch', 
         type:TextBoxWidget,
         title:'Search Substring',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllArrow', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-chevron-right',
                  marginLeft:'15',
         marginRight:'15',
         marginTop:'50',
                                                      skin:'analogicpopupicon',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllReplace', 
         type:TextBoxWidget,
         title:'Replace Substring',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneAllRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllPrefix', 
         type:TextBoxWidget,
         title:'Prefix',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllPostfix', 
         type:TextBoxWidget,
         title:'Postfix',
                                                      marginLeft:'40',
                  marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneAllRow4', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllSourceApplication', 
         type:DropBoxWidget,
         title:'Source Application',
         titleVisible:true,
         multiSelect:false,
                                                               marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllArrow2', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-chevron-right',
                  marginLeft:'15',
         marginRight:'15',
         marginTop:'50',
                                                      skin:'analogicpopupicon',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllSourceWidget', 
         type:DropBoxWidget,
         title:'Source Widget',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridCloneAllSourceApplication.finished","method":"refresh"}],
                                    marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneAllRow5', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllContent', 
         type:DropBoxWidget,
         title:'Content',
         titleVisible:true,
         multiSelect:true,
                  items:[{"name":"widget-config"},{"name":"event-map"},{"name":"data repository"}],
         listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridSourceApplication.finished","method":"refresh"}],
                                    marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'multiselect'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllPosition', 
         type:TextBoxWidget,
         title:'New Widget Position',
                                                      marginLeft:'40',
                  marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
     {
     id:'adminPortalWidgetCatalogAddNewGridCloneAllRow10', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetCatalogAddNewGridCloneAllButtonGrid', 
      type:GridWidget,
                                    width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogAddNewGridCloneAllButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneAllButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllButton', 
         type:ButtonWidget,
         label:'Clone Widget',
                  action:'',
                                                               marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogAddNewGridCloneAllButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogAddNewGridCloneAllCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                                             marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalWidgetCatalogDeleteWarnContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'200',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
      widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalWidgetCatalogDeleteWarnGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogDeleteWarnGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogDeleteWarnText', 
         type:TextWidget,
         title:'Admin Portal',
         body:'Are you sure you want to delete the selected widget?',
                                                                                                                                                         }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalWidgetCatalogDeleteWarnGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetCatalogDeleteWarnGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogDeleteWarnGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogDeleteWarnGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogDeleteWarnGridButton', 
         type:ButtonWidget,
         label:'Delete',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogDeleteWarnGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogDeleteWarnGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalWidgetCatalogDeployWarnContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'200',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
      widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalWidgetCatalogDeployWarnGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogDeployWarnGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogDeployWarnText', 
         type:TextWidget,
         title:'Admin Portal',
         body:'Are you sure you want to deploy the currently selected application?',
                                                                                                                                                         }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalWidgetCatalogDeployWarnGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetCatalogDeployWarnGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetCatalogDeployWarnGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetCatalogDeployWarnGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogDeployWarnGridButton', 
         type:ButtonWidget,
         label:'Deploy',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetCatalogDeployWarnGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetCatalogDeployWarnGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
adminPortalEventCatalog : 
    {
    id:'adminPortalEventCatalog', 
    type:PageWidget,
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                    
      {
      id:'adminPortalEventCatalogTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalEventCatalogTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                     width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventCatalogTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'80%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogTitleGridTitle1', 
         type:TextWidget,
         title:'Event Catalog',
                                                                                          titleFontSize:40,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventCatalogTitleGridUserCell', 
        type:GridCellWidget,
                                                alignment:'center-right',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogUserGridApplicationDropBox', 
         type:DropBoxWidget,
                                                      listen:[{"event":"bodyReady","method":"refreshWithState"}],
                           marginRight:'20',
                                                                                          skin:'applist'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogUserGridButton', 
         type:ButtonWidget,
         label:'Oravecz Tamas',
                  action:'',
                           icon:'icon-profile',
                                                                                          skin:'userpanel',
         listen:[{"event":"choose.adminPortalEventCatalogUserGridApplicationDropBox.finished","method":"refresh"}],
                                                      }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventCatalogHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["Event ID","Widget Type","Action Order","Action Name"],
        searchField:true,
        checkbox:false,
        visible:true,
        columnWidths:["43%","20%","15%","15%"],
                        fadeOutNum:12,
        listen:[{"event":"choose.adminPortalEventCatalogUserGridApplicationDropBox.finished","method":"refreshWithWaitingForEvent","parameters":["rendered.adminPortalEventCatalogUserGridButton"]}],
        isInBox:false,
                                        marginLeft:'30',
        marginRight:'30',
        marginTop:'50',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalEventCatalogHorizontalTableChoose', 
         type:RadioButtonRowWidget,
         action:'choose',
         align:'left',
         position:1} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogHorizontalTableDelete', 
         type:DeleteButtonRowWidget,
         action:'delete',
         deleteMessage:'Are you sure to clear this event?',
         align:'right',
         position:1}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
     {
     id:'adminPortalEventCatalogContainer', 
     type:ContainerWidget,
               anchorOnClick:false,
          width:'100%',
     bgScrollable:true,
     closeBtn:false,
                              fixed:true,
     height:'70',
     behaviour:'swipe',
     pinned:true,
     position:'bottom',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                      
      {
      id:'adminPortalEventCatalogContainerGrid', 
      type:GridWidget,
                              marginBottom:'10',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalEventCatalogContainerGridRow', 
       type:GridRowWidget,
                                   marginBottom:'10',
       alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventCatalogContainerGridCell0', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridButton0', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-column-position',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventCatalogContainerGridCell1', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridButton1', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-main-financials-off',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventCatalogContainerGridCell3', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridButton3', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-footer-results',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventCatalogContainerGridCell4', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridButton4', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-settings',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventCatalogContainerGridCell5', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridButton5', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-history',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventCatalogContainerGridCell6', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridButton6', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-planning',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventCatalogContainerGridCell7', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridButton7', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-jump',
                                                                                          skin:'mainmenu',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalEventCatalogContainerGridRow2', 
       type:GridRowWidget,
                                          alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventCatalogContainerGridCell02', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridText0', 
         type:TextWidget,
         title:'Main Menu',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventCatalogContainerGridCell12', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridText1', 
         type:TextWidget,
         title:'Widget Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventCatalogContainerGridCell32', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridText3', 
         type:TextWidget,
         title:'Data Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventCatalogContainerGridCell42', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridText4', 
         type:TextWidget,
         title:'System Config',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventCatalogContainerGridCell52', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridText5', 
         type:TextWidget,
         title:'Events And Logs',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventCatalogContainerGridCell62', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridText6', 
         type:TextWidget,
         title:'Applications',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventCatalogContainerGridCell72', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventCatalogContainerGridText7', 
         type:TextWidget,
         title:'Deployment',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
adminPortalDataCatalog : 
    {
    id:'adminPortalDataCatalog', 
    type:PageWidget,
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                    
      {
      id:'adminPortalDataCatalogTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalDataCatalogTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                     width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalDataCatalogTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'80%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogTitleGridTitle1', 
         type:TextWidget,
         title:'Data Catalog',
                                                                                          titleFontSize:40,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalDataCatalogTitleGridUserCell', 
        type:GridCellWidget,
                                                alignment:'center-right',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogUserGridApplicationDropBox', 
         type:DropBoxWidget,
                                                      listen:[{"event":"bodyReady","method":"refreshWithState"}],
                           marginRight:'20',
                                                                                          skin:'applist'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogUserGridButton', 
         type:ButtonWidget,
         label:'Oravecz Tamas',
                  action:'',
                           icon:'icon-profile',
                                                                                          skin:'userpanel',
         listen:[{"event":"choose.adminPortalWidgetDataCatalogUserGridApplicationDropBox.finished","method":"refresh"}],
                                                      }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalDataCatalogHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["Widget ID","Parameter","Dataset"],
        searchField:true,
        checkbox:false,
        visible:true,
                                fadeOutNum:12,
        listen:[{"event":"choose.adminPortalDataCatalogUserGridApplicationDropBox.finished","method":"refreshWithWaitingForEvent","parameters":["rendered.adminPortalDataCatalogUserGridButton"]}],
        isInBox:false,
                                        marginLeft:'30',
        marginRight:'30',
        marginTop:'50',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalDataCatalogHorizontalTableChoose', 
         type:RadioButtonRowWidget,
         action:'choose',
         align:'left',
         position:1}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalDataCatalogContainer', 
     type:ContainerWidget,
               anchorOnClick:false,
          width:'100%',
     bgScrollable:true,
     closeBtn:false,
                              fixed:true,
     height:'70',
     behaviour:'swipe',
     pinned:true,
     position:'bottom',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                      
      {
      id:'adminPortalDataCatalogContainerGrid', 
      type:GridWidget,
                              marginBottom:'10',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalDataCatalogContainerGridRow', 
       type:GridRowWidget,
                                   marginBottom:'10',
       alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalDataCatalogContainerGridCell0', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridButton0', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-column-position',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalDataCatalogContainerGridCell1', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridButton1', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-main-financials-off',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalDataCatalogContainerGridCell2', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridButton2', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-main-risks-off',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalDataCatalogContainerGridCell3', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridButton3', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-footer-results',
                                                                                          skin:'mainmenuon',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalDataCatalogContainerGridCell4', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridButton4', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-settings',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalDataCatalogContainerGridCell5', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridButton5', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-history',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalDataCatalogContainerGridCell6', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridButton6', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-planning',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalDataCatalogContainerGridCell7', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridButton7', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-jump',
                                                                                          skin:'mainmenu',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalDataCatalogContainerGridRow2', 
       type:GridRowWidget,
                                          alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalDataCatalogContainerGridCell02', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridText0', 
         type:TextWidget,
         title:'Main Menu',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalDataCatalogContainerGridCell12', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridText1', 
         type:TextWidget,
         title:'Widget Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalDataCatalogContainerGridCell22', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridText2', 
         type:TextWidget,
         title:'Event Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalDataCatalogContainerGridCell32', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridText3', 
         type:TextWidget,
         title:'Data Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#007aff',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalDataCatalogContainerGridCell42', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridText4', 
         type:TextWidget,
         title:'System Config',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalDataCatalogContainerGridCell52', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridText5', 
         type:TextWidget,
         title:'Events And Logs',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalDataCatalogContainerGridCell62', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridText6', 
         type:TextWidget,
         title:'Applications',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalDataCatalogContainerGridCell72', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalDataCatalogContainerGridText7', 
         type:TextWidget,
         title:'Deployment',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
adminPortalSystemConfig : 
    {
    id:'adminPortalSystemConfig', 
    type:PageWidget,
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                    
      {
      id:'adminPortalSystemConfigTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalSystemConfigTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                     width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalSystemConfigTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'80%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigTitleGridTitle1', 
         type:TextWidget,
         title:'System Configuration',
                                                                                          titleFontSize:40,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalSystemConfigTitleGridUserCell', 
        type:GridCellWidget,
                                                alignment:'center-right',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigUserGridApplicationDropBox', 
         type:DropBoxWidget,
                                                      listen:[{"event":"bodyReady","method":"refreshWithState"}],
                           marginRight:'20',
                                                                                          skin:'applist'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigUserGridButton', 
         type:ButtonWidget,
         label:'Oravecz Tamas',
                  action:'',
                           icon:'icon-profile',
                                                                                          skin:'userpanel',
         listen:[{"event":"choose.adminPortalSystemConfigUserGridApplicationDropBox.finished","method":"refresh"}],
                                                      }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     {
     id:'adminPortalSystemConfigContainer', 
     type:ContainerWidget,
               anchorOnClick:false,
          width:'100%',
     bgScrollable:true,
     closeBtn:false,
                              fixed:true,
     height:'70',
     behaviour:'swipe',
     pinned:true,
     position:'bottom',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                      
      {
      id:'adminPortalSystemConfigContainerGrid', 
      type:GridWidget,
                              marginBottom:'10',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalSystemConfigContainerGridRow', 
       type:GridRowWidget,
                                   marginBottom:'10',
       alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalSystemConfigContainerGridCell0', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridButton0', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-column-position',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalSystemConfigContainerGridCell1', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridButton1', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-main-financials-off',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalSystemConfigContainerGridCell4', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridButton4', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-settings',
                                                                                          skin:'mainmenuon',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalSystemConfigContainerGridCell5', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridButton5', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-history',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalSystemConfigContainerGridCell6', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridButton6', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-planning',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalSystemConfigContainerGridCell7', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridButton7', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-jump',
                                                                                          skin:'mainmenu',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalSystemConfigContainerGridRow2', 
       type:GridRowWidget,
                                          alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalSystemConfigContainerGridCell02', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridText0', 
         type:TextWidget,
         title:'Main Menu',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalSystemConfigContainerGridCell12', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridText1', 
         type:TextWidget,
         title:'Widget Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalSystemConfigContainerGridCell42', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridText4', 
         type:TextWidget,
         title:'System Config',
                                                                                          titleFontSize:13,
         titleFontColor:'#007aff',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalSystemConfigContainerGridCell52', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridText5', 
         type:TextWidget,
         title:'Events And Logs',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalSystemConfigContainerGridCell62', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridText6', 
         type:TextWidget,
         title:'Applications',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalSystemConfigContainerGridCell72', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigContainerGridText7', 
         type:TextWidget,
         title:'Deployment',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigHorizontalTable', 
         type:HorizontalTableWidget,
         title:'',
         titleVisible:false,
         columnNames:["Application","Parameter","Parameter Value"],
         searchField:true,
         checkbox:false,
         visible:true,
         columnWidths:["20%","30%","50%"],
                                    listen:[{"event":"bodyReady","method":"refreshWithState"},{"event":"launch.analogicPortalApplicationList.finished","method":"refreshWithWaitingForEvent","parameters":["rendered.analogicPortalUserBox"]},{"event":"delete.HorizontalTableSystemConfig.finished","method":"refreshWithState"},{"event":"save.TextAreaEditWidgetSystemConfig.finished","method":"refreshWithState"},{"event":"choose.adminPortalSystemConfigUserGridApplicationDropBox.finished","method":"refreshWithWaitingForEvent","parameters":["rendered.adminPortalSystemConfigUserGridButton"]}],
         isInBox:false,
                                             marginLeft:'30',
         marginRight:'30',
         marginTop:'50',
                           widgets:[]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      {
      id:'adminPortalSystemConfigSmallTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalSystemConfigSmallTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalSystemConfigSmallTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'75%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigSmallTitleGridTitle1', 
         type:TextWidget,
         title:'Widget Type List',
                                                                                          titleFontSize:30,
                                                                        }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalSystemConfigWidgetTypeHorizontalTable', 
         type:HorizontalTableWidget,
         title:'',
         titleVisible:false,
         columnNames:["Widget Type","Config Parameter","Definition"],
         searchField:true,
         checkbox:false,
         visible:true,
                                                      isInBox:false,
                                             marginLeft:'30',
         marginRight:'30',
         marginTop:'50',
         marginBottom:'100',
                  widgets:[]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
adminPortalEventLogs : 
    {
    id:'adminPortalEventLogs', 
    type:PageWidget,
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                    
      {
      id:'adminPortalEventLogsTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalEventLogsTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                     width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventLogsTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'80%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsTitleGridTitle1', 
         type:TextWidget,
         title:'Events And Logs',
                                                                                          titleFontSize:40,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventLogsTitleGridUserCell', 
        type:GridCellWidget,
                                                alignment:'center-right',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsUserGridButton', 
         type:ButtonWidget,
         label:'Oravecz Tamas',
                  action:'',
                           icon:'icon-profile',
                                                                                          skin:'userpanel',
                                                               }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     {
     id:'adminPortalEventLogsContainer', 
     type:ContainerWidget,
               anchorOnClick:false,
          width:'100%',
     bgScrollable:true,
     closeBtn:false,
                              fixed:true,
     height:'70',
     behaviour:'swipe',
     pinned:true,
     position:'bottom',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                      
      {
      id:'adminPortalEventLogsContainerGrid', 
      type:GridWidget,
                              marginBottom:'10',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalEventLogsContainerGridRow', 
       type:GridRowWidget,
                                   marginBottom:'10',
       alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventLogsContainerGridCell0', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridButton0', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-column-position',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventLogsContainerGridCell1', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridButton1', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-main-financials-off',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventLogsContainerGridCell4', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridButton4', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-settings',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventLogsContainerGridCell5', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridButton5', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-history',
                                                                                          skin:'mainmenuon',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventLogsContainerGridCell6', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridButton6', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-planning',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventLogsContainerGridCell7', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridButton7', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-jump',
                                                                                          skin:'mainmenu',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalEventLogsContainerGridRow2', 
       type:GridRowWidget,
                                          alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventLogsContainerGridCell02', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridText0', 
         type:TextWidget,
         title:'Main Menu',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventLogsContainerGridCell12', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridText1', 
         type:TextWidget,
         title:'Widget Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventLogsContainerGridCell42', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridText4', 
         type:TextWidget,
         title:'System Config',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventLogsContainerGridCell52', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridText5', 
         type:TextWidget,
         title:'Events And Logs',
                                                                                          titleFontSize:13,
         titleFontColor:'#007aff',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventLogsContainerGridCell62', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridText6', 
         type:TextWidget,
         title:'Applications',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventLogsContainerGridCell72', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsContainerGridText7', 
         type:TextWidget,
         title:'Deployment',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      {
      id:'adminPortalEventLogsSmallTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalEventLogsSmallTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventLogsSmallTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'75%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsSmallTitleGridTitle1', 
         type:TextWidget,
         title:'Application Events',
                                                                                          titleFontSize:30,
                                                                        }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      {
      id:'adminPortalEventLogsApplicationLogsGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
      marginTop:'20',
                              widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventLogsApplicationLogsGridRow1', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsApplicationLogsGridFrom', 
         type:DatePickerWidget,
         title:'From',
                  editable:true,
                                                                                 skin:'analogic',
                  } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
         {
         id:'adminPortalEventLogsApplicationLogsGridTo', 
         type:DatePickerWidget,
         title:'To',
                  editable:true,
                                             marginLeft:'20',
                                    skin:'analogic',
                  } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
         {
         id:'adminPortalEventLogsApplicationLogsGridTop', 
         type:TextBoxWidget,
         title:'Top',
                                                      marginLeft:'20',
                                    width:'100',
         skin:'analogic',
                                    titleFontColor:'#000000',
                                             }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
       {
       id:'adminPortalEventLogsApplicationLogsGridRow2', 
       type:GridRowWidget,
                                                                             widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventLogsApplicationLogsGridHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["TimeStamp","Message"],
        searchField:true,
        checkbox:false,
        visible:true,
        columnWidths:["10%","90%"],
                        fadeOutNum:10,
        listen:[{"event":"choose.adminPortalEventLogsApplicationLogsGridFrom.finished","method":"refresh"},{"event":"choose.adminPortalEventLogsApplicationLogsGridTo.finished","method":"refresh"},{"event":"writeEnd.adminPortalEventLogsApplicationLogsGridTop.finished","method":"refresh"}],
        isInBox:false,
                        width:'100%',
                                marginTop:'20',
        marginBottom:'100',
                widgets:[]}
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalEventLogsSmallTitleGrid2', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalEventLogsSmallTitleGridRow2', 
       type:GridRowWidget,
                            marginTop:'50',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventLogsSmallTitleGridCellTitle12', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'75%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsSmallTitleGridTitle12', 
         type:TextWidget,
         title:'Application Edit Audit Trail',
                                                                                          titleFontSize:30,
                                                                        }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      {
      id:'adminPortalEventLogsAuditLogsGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
      marginTop:'20',
                              widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventLogsAuditLogsGridRow1', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventLogsAuditLogsGridFrom', 
         type:DatePickerWidget,
         title:'From',
                  editable:true,
                                                                                 skin:'analogic',
                  } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
         {
         id:'adminPortalEventLogsAuditLogsGridTo', 
         type:DatePickerWidget,
         title:'To',
                  editable:true,
                                             marginLeft:'20',
                                    skin:'analogic',
                  } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
         {
         id:'adminPortalEventLogsAuditLogsGridTop', 
         type:TextBoxWidget,
         title:'Top',
                                                      marginLeft:'20',
                                    width:'100',
         skin:'analogic',
                                    titleFontColor:'#000000',
                                             }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
       {
       id:'adminPortalEventLogsAuditLogsGridRow2', 
       type:GridRowWidget,
                                                                             widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventLogsAuditLogsGridHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["TimeStamp","User","Cube","Tuple","Old Value","New Value"],
        searchField:true,
        checkbox:false,
        visible:true,
                                fadeOutNum:10,
        listen:[{"event":"choose.adminPortalEventLogsAuditLogsGridFrom.finished","method":"refresh"},{"event":"choose.adminPortalEventLogsAuditLogsGridTo.finished","method":"refresh"},{"event":"writeEnd.adminPortalEventLogsAuditLogsGridTop.finished","method":"refresh"}],
        isInBox:false,
                        width:'90%',
                                marginTop:'20',
        marginBottom:'100',
                widgets:[]}
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
adminPortalApplications : 
  {
  id:'adminPortalApplications', 
  type:PageWidget,
    widgets:[
                                                                                                                                                                                                  
      {
      id:'adminPortalApplicationsTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                     width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'80%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsTitleGridTitle1', 
         type:TextWidget,
         title:'Application Management',
                                                                                          titleFontSize:40,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsTitleGridUserCell', 
        type:GridCellWidget,
                                                alignment:'center-right',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsUserGridButton', 
         type:ButtonWidget,
         label:'Oravecz Tamas',
                  action:'',
                           icon:'icon-profile',
                                                                                          skin:'userpanel',
                                                               }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     {
     id:'adminPortalApplicationsContainer', 
     type:ContainerWidget,
               anchorOnClick:false,
          width:'100%',
     bgScrollable:true,
     closeBtn:false,
                              fixed:true,
     height:'70',
     behaviour:'swipe',
     pinned:true,
     position:'bottom',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                      
      {
      id:'adminPortalApplicationsContainerGrid', 
      type:GridWidget,
                              marginBottom:'10',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsContainerGridRow', 
       type:GridRowWidget,
                                   marginBottom:'10',
       alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsContainerGridCell0', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridButton0', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-column-position',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalApplicationsContainerGridCell1', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridButton1', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-main-financials-off',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalApplicationsContainerGridCell4', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridButton4', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-settings',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalApplicationsContainerGridCell5', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridButton5', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-history',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalApplicationsContainerGridCell6', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridButton6', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-planning',
                                                                                          skin:'mainmenuon',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalApplicationsContainerGridCell7', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridButton7', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-jump',
                                                                                          skin:'mainmenu',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsContainerGridRow2', 
       type:GridRowWidget,
                                          alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsContainerGridCell02', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridText0', 
         type:TextWidget,
         title:'Main Menu',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsContainerGridCell12', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridText1', 
         type:TextWidget,
         title:'Widget Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsContainerGridCell42', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridText4', 
         type:TextWidget,
         title:'System Config',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsContainerGridCell52', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridText5', 
         type:TextWidget,
         title:'Events And Logs',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsContainerGridCell62', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridText6', 
         type:TextWidget,
         title:'Applications',
                                                                                          titleFontSize:13,
         titleFontColor:'#007aff',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsContainerGridCell72', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsContainerGridText7', 
         type:TextWidget,
         title:'Deployment',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      {
      id:'adminPortalApplicationsSmallTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsSmallTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsSmallTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'75%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsSmallTitleGridTitle1', 
         type:TextWidget,
         title:'Deployment Management',
                                                                                          titleFontSize:24,
                                                                        }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsDeploymentSegmented', 
        type:SegmentedControlWidget,
        visible:true,
        marginLeft:'30',
        marginRight:'30',
        marginTop:'20',
        margintBottom:'20',
        width:'420',
                skin:'analogic',
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeploymentSegmentedTab1', 
         type:SegmentedControlItemWidget,
         label:'Deployment',
         action:'segmentedControlTab1',
         selected:true,
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
         {
         id:'adminPortalApplicationsDeploymentSegmentedTab2', 
         type:SegmentedControlItemWidget,
         label:'Backup',
         action:'segmentedControlTab2',
                                                                        } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
         {
         id:'adminPortalApplicationsDeploymentSegmentedTab3', 
         type:SegmentedControlItemWidget,
         label:'Restore',
         action:'segmentedControlTab3',
         selected:false,
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
       {
       id:'adminPortalApplicationsDeploymentGrid', 
       type:GridWidget,
              marginLeft:'30',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        {
        id:'adminPortalApplicationsDeploymentGridRow1', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeploymentGridApplication', 
         type:DropBoxWidget,
         title:'Application',
         titleVisible:true,
         multiSelect:false,
                                                               marginTop:'20',
                  width:'300',
                  titleFontSize:14,
         titleFontColor:'#000000',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsDeploymentGridRow2', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeploymentGridFolder', 
         type:TextWidget,
         title:'Deployment Staging folder',
                  listen:[{"event":"choose.adminPortalApplicationsDeploymentGridApplication.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
                           marginTop:'20',
                                             titleFontSize:14,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsDeploymentGridRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeploymentGridButton', 
         type:ButtonWidget,
         label:'Deploy',
                  action:'',
                                                               marginTop:'20',
                                                      skin:'analogicmain',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsBackupGrid', 
       type:GridWidget,
       visible:false,
       marginLeft:'30',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        {
        id:'adminPortalApplicationsBackupGridRow1', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsBackupGridApplication', 
         type:DropBoxWidget,
         title:'Application',
         titleVisible:true,
         multiSelect:false,
                                                               marginTop:'20',
                  width:'300',
                  titleFontSize:14,
         titleFontColor:'#000000',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsBackupGridRow2', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsBackupGridFolder', 
         type:TextWidget,
         title:'Backup Staging folder',
                  listen:[{"event":"choose.adminPortalApplicationsBackupGridApplication.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
                           marginTop:'20',
                                             titleFontSize:14,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsBackupGridRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsBackupGridButton', 
         type:ButtonWidget,
         label:'Backup',
                  action:'',
                                                               marginTop:'20',
                                                      skin:'analogicmain',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsRestoreGrid', 
       type:GridWidget,
       visible:false,
       marginLeft:'30',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        {
        id:'adminPortalApplicationsRestoreGridRow1', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsRestoreGridApplication', 
         type:DropBoxWidget,
         title:'Application',
         titleVisible:true,
         multiSelect:false,
                                                               marginTop:'20',
                  width:'300',
                  titleFontSize:14,
         titleFontColor:'#000000',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsRestoreGridRow2', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsRestoreGridBackupList', 
         type:DropBoxWidget,
         title:'Backup List',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"choose.adminPortalApplicationsRestoreGridApplication.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
                                    marginTop:'20',
                  width:'300',
                  titleFontSize:14,
         titleFontColor:'#000000',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsRestoreGridRow3', 
        type:GridRowWidget,
                                marginTop:'20',
                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsRestoreGridButtonRefresh', 
         type:ButtonWidget,
         label:'Refresh Backup List',
                  action:'',
                                                                                                                     skin:'analogicmain',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalApplicationsRestoreGridButton', 
         type:ButtonWidget,
         label:'Restore',
                  action:'',
                                             marginLeft:'20',
                                                                        skin:'analogicmain',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      {
      id:'adminPortalApplicationsSmallTitleGrid2', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsSmallTitleGridRow2', 
       type:GridRowWidget,
                            marginTop:'50',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsSmallTitleGridCellTitle12', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'75%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsSmallTitleGridTitle12', 
         type:TextWidget,
         title:'System Management',
                                                                                          titleFontSize:24,
                                                                        }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalApplicationsSystemGrid', 
       type:GridWidget,
              marginLeft:'30',
       marginRight:'30',
       marginTop:'20',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        {
        id:'adminPortalApplicationsSystemGridRow1', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsSystemGridCreateButton', 
         type:ButtonWidget,
         label:'Create Application',
                  action:'',
                                                                                                                     skin:'analogicmain',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalApplicationsSystemGridDeleteButton', 
         type:ButtonWidget,
         label:'Delete Application',
                  action:'',
                                             marginLeft:'20',
                                                                        skin:'analogicmain',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalApplicationsSystemGridRestartButton', 
         type:ButtonWidget,
         label:'Restart Webserver',
                  action:'',
                                             marginLeft:'20',
                                                                        skin:'analogicmain',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      {
      id:'adminPortalApplicationsSmallTitleGrid3', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsSmallTitleGridRow3', 
       type:GridRowWidget,
                            marginTop:'50',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsSmallTitleGridCellTitle13', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'75%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsSmallTitleGridTitle13', 
         type:TextWidget,
         title:'Deployment Logs',
                                                                                          titleFontSize:24,
                                                                        }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalApplicationsLogsGrid', 
       type:GridWidget,
              marginLeft:'30',
       marginRight:'30',
       marginTop:'20',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        {
        id:'adminPortalApplicationsLogsGridRow1', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsLogsGridFrom', 
         type:DatePickerWidget,
         title:'From',
                  editable:true,
                                                                                 skin:'analogic',
                  } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
         {
         id:'adminPortalApplicationsLogsGridTo', 
         type:DatePickerWidget,
         title:'To',
                  editable:true,
                                             marginLeft:'20',
                                    skin:'analogic',
                  } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
         {
         id:'adminPortalApplicationsLogsGridTop', 
         type:TextBoxWidget,
         title:'Top',
                                                      marginLeft:'20',
                                    width:'100',
         skin:'analogic',
                                    titleFontColor:'#000000',
                                             }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalApplicationsLogsGridRow2', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsLogsGridHorizontalTable', 
         type:HorizontalTableWidget,
         title:'',
         titleVisible:false,
         columnNames:["TimeStamp","Message"],
         searchField:true,
         checkbox:false,
         visible:true,
         columnWidths:["10%","90%"],
                           fadeOutNum:10,
         listen:[{"event":"choose.DatePickerFromDeploymentLog.finished","method":"refresh"},{"event":"choose.DatePickerToDeploymentLog.finished","method":"refresh"},{"event":"writeEnd.TextBoxDeploymentLog.finished","method":"refresh"},{"event":"launch.RestoreBackupButton.finished","method":"refreshWithState"},{"event":"launch.RestartWebserverButton.finished","method":"refreshWithState"},{"event":"launch.DeployApplicationButton.finished","method":"refreshWithState"},{"event":"launch.BackupApplicationButton.finished","method":"refreshWithState"},{"event":"launch.DeleteApplicationButton.finished","method":"refreshWithState"},{"event":"launch.CreateApplicationButton.finished","method":"refreshWithState"}],
         isInBox:false,
                           width:'100%',
                                    marginTop:'20',
         marginBottom:'100',
                  widgets:[]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
   {
   id:'adminPortalApplicationsCreateNewContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'750',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
   skin:'scrollable',
   widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalApplicationsCreateNewGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsCreateNewGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewAppName', 
         type:TextBoxWidget,
         title:'Application Name',
                                                                                          width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalApplicationsCreateNewGridRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewAppWarPath', 
         type:TextBoxWidget,
         title:'Application War Path',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalApplicationsCreateNewGridRow4', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewAppWarName', 
         type:TextBoxWidget,
         title:'Application War Name',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalApplicationsCreateNewGridRow6', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewAppMainPage', 
         type:TextBoxWidget,
         title:'Application Main Page',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalApplicationsCreateNewGridRow7', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewAppHost', 
         type:TextBoxWidget,
         title:'Application Host',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalApplicationsCreateNewGridRow8', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewConfigSource', 
         type:DropBoxWidget,
         title:'Config Source Application',
         titleVisible:true,
         multiSelect:false,
                                                               marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalApplicationsCreateNewGridRow9', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewProxy', 
         type:TextBoxWidget,
         title:'Application API For Proxy',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalApplicationsCreateNewGridRow10', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewAppTM1', 
         type:TextBoxWidget,
         title:'Application TM1 Server',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
     {
     id:'adminPortalApplicationsCreateNewGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalApplicationsCreateNewGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsCreateNewGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsCreateNewGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewGridButton', 
         type:ButtonWidget,
         label:'Create',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalApplicationsCreateNewGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsCreateNewGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalApplicationsDeleteContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'200',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
   skin:'scrollable',
   widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalApplicationsDeleteGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsDeleteGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeleteApplication', 
         type:DropBoxWidget,
         title:'Application',
         titleVisible:true,
         multiSelect:false,
                                                                                 width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalApplicationsDeleteGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalApplicationsDeleteGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsDeleteGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsDeleteGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeleteGridButton', 
         type:ButtonWidget,
         label:'Delete',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalApplicationsDeleteGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeleteGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
adminPortalWidgetConfiguration : 
 {
 id:'adminPortalWidgetConfiguration', 
 type:PageWidget,
  widgets:[
                                                                                                 
      {
      id:'adminPortalWidgetConfigurationTitleGrid', 
      type:GridWidget,
            marginLeft:'30',
      marginRight:'30',
                                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationTitleGridRow', 
       type:GridRowWidget,
                            marginTop:'50',
                                                 widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationTitleGridCellBackButton', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTitleGridBackButton', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-back-arrow',
                           marginRight:'10',
                                                               skin:'analogicbackbutton',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationTitleGridCellTitle1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'80%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTitleGridTitle1', 
         type:TextWidget,
         title:'',
                                                                                          titleFontSize:30,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationTitleGridUserCell', 
        type:GridCellWidget,
                                                alignment:'center-right',
        width:'30%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationUserGridButton', 
         type:ButtonWidget,
         label:'Oravecz Tamas',
                  action:'',
                           icon:'icon-profile',
                                                                                          skin:'userpanel',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationTitleGridRow2', 
       type:GridRowWidget,
                                                                             widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationTitleGridCellTitle2', 
        type:GridCellWidget,
                marginLeft:'35',
                                alignment:'center-left',
                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTitleGridTitle2', 
         type:TextWidget,
         title:'on page:',
                                                                        skin:'lighttext',
                  titleFontSize:30,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationTitleGridCellTitle3', 
        type:GridCellWidget,
                marginLeft:'10',
                                alignment:'center-left',
        width:'20%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTitleGridTitle3', 
         type:TextWidget,
         title:'',
                                                                        skin:'lighttext',
                  titleFontSize:30,
                                                                        }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      {
      id:'adminPortalWidgetConfigurationSegmentedGrid', 
      type:GridWidget,
                                    width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationSegmentedGridRow', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationAddNewSegmented', 
        type:SegmentedControlWidget,
        visible:true,
        marginLeft:'20',
        marginRight:'20',
        marginTop:'20',
        margintBottom:'20',
        width:'720',
                skin:'analogic',
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddNewSegmentedTab1', 
         type:SegmentedControlItemWidget,
         label:'Widget Config',
         action:'segmentedControlTab1',
         selected:true,
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
         {
         id:'adminPortalWidgetConfigurationAddNewSegmentedTab2', 
         type:SegmentedControlItemWidget,
         label:'Event Map',
         action:'segmentedControlTab2',
                                                                        } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
         {
         id:'adminPortalWidgetConfigurationAddNewSegmentedTab3', 
         type:SegmentedControlItemWidget,
         label:'Data Repository',
         action:'segmentedControlTab3',
         selected:false,
                                                               }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
       {
       id:'adminPortalWidgetConfigurationInputGrid', 
       type:GridWidget,
              marginLeft:'30',
       marginRight:'30',
       marginTop:'30',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        {
        id:'adminPortalWidgetConfigurationInputGridRow1', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationInputChangeButton', 
         type:ButtonWidget,
         label:'Change Position',
                  action:'',
                                                                                                                     skin:'analogicmain',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalWidgetConfigurationInputCopyContentButton', 
         type:ButtonWidget,
         label:'Copy Content',
                  action:'',
                                             marginLeft:'30',
                                                                        skin:'analogicmain',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     {
     id:'adminPortalWidgetConfigurationContainer', 
     type:ContainerWidget,
               anchorOnClick:false,
          width:'100%',
     bgScrollable:true,
     closeBtn:false,
                              fixed:true,
     height:'70',
     behaviour:'swipe',
     pinned:true,
     position:'bottom',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                      
      {
      id:'adminPortalWidgetConfigurationContainerGrid', 
      type:GridWidget,
                              marginBottom:'10',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationContainerGridRow', 
       type:GridRowWidget,
                                   marginBottom:'10',
       alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationContainerGridCell0', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridButton0', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-column-position',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationContainerGridCell1', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridButton1', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-main-financials-off',
                                                                                          skin:'mainmenuon',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationContainerGridCell4', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridButton4', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-settings',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationContainerGridCell5', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridButton5', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-history',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationContainerGridCell6', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridButton6', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-main-planning',
                                                                                          skin:'mainmenu',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationContainerGridCell7', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridButton7', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-icon-jump',
                                                                                          skin:'mainmenu',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationContainerGridRow2', 
       type:GridRowWidget,
                                          alignment:'center',
                                   widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationContainerGridCell02', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridText0', 
         type:TextWidget,
         title:'Main Menu',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationContainerGridCell12', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridText1', 
         type:TextWidget,
         title:'Widget Catalog',
                                                                                          titleFontSize:13,
         titleFontColor:'#007aff',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationContainerGridCell42', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridText4', 
         type:TextWidget,
         title:'System Config',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationContainerGridCell52', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridText5', 
         type:TextWidget,
         title:'Events And Logs',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationContainerGridCell62', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'50',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridText6', 
         type:TextWidget,
         title:'Applications',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationContainerGridCell72', 
        type:GridCellWidget,
                marginLeft:'30',
        marginRight:'30',
                marginBottom:'10',
        alignment:'top-center',
        width:'100',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationContainerGridText7', 
         type:TextWidget,
         title:'Deployment',
                                                                                          titleFontSize:13,
         titleFontColor:'#747b85',
                                                               }
]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
   {
   id:'adminPortalWidgetConfigurationChangeContainer', 
   type:ContainerWidget,
            visible:false,
   width:'1050',
   bgScrollable:true,
                        height:'350',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
   skin:'scrollable',
   widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalWidgetConfigurationChangeGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationChangeGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationChangeGridOldParentWidget', 
         type:TextWidget,
         title:'Old Parent Widget',
         body:'Old parent name',
                                                      width:'490',
         skin:'analogicparent',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationChangeGridArrow', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-arrow-right1',
                  marginLeft:'15',
         marginRight:'15',
         marginTop:'30',
                                                      skin:'analogicpopupicon',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalWidgetConfigurationChangeGridParentWidget', 
         type:DropBoxWidget,
         title:'New Parent Widget',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridSourceApplication.finished","method":"refresh"}],
                                                      width:'450',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationChangeGridRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationChangeGridOldPosition', 
         type:TextWidget,
         title:'Old Widget Position',
         body:'Old parent name',
                                    marginTop:'20',
                  width:'490',
         skin:'analogicparent',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationChangeGridArrow2', 
         type:ButtonWidget,
         label:'',
                  action:'',
                           icon:'icon-arrow-right1',
                  marginLeft:'15',
         marginRight:'15',
         marginTop:'50',
                                                      skin:'analogicpopupicon',
                                                               } ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
         {
         id:'adminPortalWidgetConfigurationChangeGridPosition', 
         type:TextBoxWidget,
         title:'New Widget Position',
                                                                        marginTop:'20',
                  width:'450',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalWidgetConfigurationChangeGridRow4', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationChangeGridUserSpecific', 
         type:DropBoxWidget,
         title:'User Specific',
                                                                                 marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalWidgetConfigurationChangeGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetConfigurationChangeGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationChangeGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationChangeGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationChangeGridButton', 
         type:ButtonWidget,
         label:'Update',
                  action:'',
                                                               marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationChangeGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationChangeGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                                             marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalWidgetConfigurationTextGrid', 
   type:GridWidget,
      marginLeft:'30',
   marginRight:'30',
   marginTop:'50',
      width:'100%',
         widgets:[
                                                                                                                                                                                                                                                                              
       {
       id:'adminPortalWidgetConfigurationTextGridRow1', 
       type:GridRowWidget,
                                                 width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationTextGridCell0_1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'50%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTextGridTitle1', 
         type:TextWidget,
         title:'Simple Parameters',
                                                      marginBottom:'30',
                                    titleFontSize:24,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationTextGridCell0_2', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'50%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTextGridTitle2', 
         type:TextWidget,
         title:'Selectable Parameters',
                                                      marginBottom:'30',
                                    titleFontSize:24,
                                                                        }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    {
    id:'adminPortalWidgetConfigurationTextGridRow', 
    type:GridRowWidget,
                            width:'100%',
                widgets:[
                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalWidgetConfigurationTextGridCell1', 
     type:GridCellWidget,
                              alignment:'top-left',
     width:'50%',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetConfigurationTextGridTable', 
      type:GridTableWidget,
                                    width:'700',
      listen:[{"event":"launch.adminPortalWidgetConfigurationCopyContentGridButton.finished","method":"refresh"}],
      skin:'widgetconfiguration',
      title:'',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
       {
       id:'adminPortalWidgetConfigurationTextGridTableHeader', 
       type:GridTableHeaderRowWidget,
                                                                                           widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        {
        id:'adminPortalWidgetConfigurationTextGridTableHeaderCell1', 
        type:GridTableHeaderCellWidget,
                                                width:'50%',
                        alignment:'center-left',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTextGridTableHeaderText1', 
         type:TextWidget,
         title:'Parameter Name',
                                                                                          titleFontSize:18,
         titleFontColor:'#007aff',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationTextGridTableHeaderCell2', 
        type:GridTableHeaderCellWidget,
                                                width:'50%',
                        alignment:'center-left',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTextGridTableHeaderText2', 
         type:TextWidget,
         title:'Parameter Value',
                           marginLeft:'10',
                                                               titleFontSize:18,
         titleFontColor:'#007aff',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationTextGridTableCell1', 
        type:GridTableCellWidget,
                                                width:'50%',
                        alignment:'center-left',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalWidgetConfigurationTextGridTableText1', 
         type:TextWidget,
         title:'',
                                                                                          titleFontSize:14,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationTextGridTableCell2', 
        type:GridTableCellWidget,
                                                width:'50%',
                        alignment:'center-left',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalWidgetConfigurationTextGridTableTextBox2', 
         type:TextBoxWidget,
                                                               marginLeft:'5',
                                             skin:'gridtablebox',
                                                                                 }
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
     {
     id:'adminPortalWidgetConfigurationTextGridCell2', 
     type:GridCellWidget,
                              alignment:'top-left',
     width:'50%',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetConfigurationDropBoxGridTable', 
      type:GridTableWidget,
                                    width:'700',
      listen:[{"event":"launch.adminPortalWidgetConfigurationCopyContentGridButton.finished","method":"refresh"}],
      skin:'widgetconfiguration',
      title:'',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
       {
       id:'adminPortalWidgetConfigurationDropBoxGridTableHeader', 
       type:GridTableHeaderRowWidget,
                                                                                           widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        {
        id:'adminPortalWidgetConfigurationDropBoxGridTableHeaderCell1', 
        type:GridTableHeaderCellWidget,
                                                width:'50%',
                        alignment:'center-left',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDropBoxGridTableHeaderText1', 
         type:TextWidget,
         title:'Parameter Name',
                                                                                          titleFontSize:18,
         titleFontColor:'#007aff',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationDropBoxGridTableHeaderCell2', 
        type:GridTableHeaderCellWidget,
                                                width:'50%',
                        alignment:'bottom-left',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDropBoxGridTableHeaderText2', 
         type:TextWidget,
         title:'Parameter Value',
                           marginLeft:'10',
                                                               titleFontSize:18,
         titleFontColor:'#007aff',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationDropBoxGridTableCell1', 
        type:GridTableCellWidget,
                                                width:'50%',
                        alignment:'center-left',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalWidgetConfigurationDropBoxGridTableText1', 
         type:TextWidget,
         title:'',
                                                                                          titleFontSize:14,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationDropBoxGridTableCell2', 
        type:GridTableCellWidget,
                                                width:'50%',
                        alignment:'center-left',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalWidgetConfigurationDropBoxGridTableDropBox', 
         type:DropBoxWidget,
                  titleVisible:false,
         multiSelect:false,
                  items:[{"name":"item1"},{"name":"item2"}],
                                                      marginBottom:'5',
         width:'250',
                                                               skin:'widgetconfiguration'}
]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalWidgetConfigurationTextGridRow2', 
       type:GridRowWidget,
                            marginTop:'30',
                     width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationTextGridCell2_1', 
        type:GridCellWidget,
                                                alignment:'center-left',
        width:'50%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTextGridTitle3', 
         type:TextWidget,
         title:'Array Parameters',
                                                      marginBottom:'30',
                                    titleFontSize:24,
                                                                        }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      {
      id:'adminPortalWidgetConfigurationTextGridRow3', 
      type:GridRowWidget,
                              marginBottom:'100',
            width:'100%',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalWidgetConfigurationTextGridCell3_1', 
       type:GridCellWidget,
                                          alignment:'top-left',
       width:'50%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationTextGridArrayHorizontalTableHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["Parameter ID","Parameter Name"],
        searchField:false,
        checkbox:false,
        visible:true,
                                        listen:[{"event":"choose.DropBoxAppFilterDataRepository.finished","method":"refresh"},{"event":"bodyReady","method":"refreshWithState"}],
        isInBox:false,
                        width:'700',
                                        marginBottom:'100',
                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalWidgetConfigurationTextGridArrayHorizontalTableHorizontalTableEdit', 
         type:ActionButtonRowWidget,
         action:'edit',
         align:'right',
         position:1,
         icon:'icon-edit'}
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        {
        id:'adminPortalWidgetConfigurationTextGridCell3_2', 
        type:GridCellWidget,
                                                alignment:'top-left',
        width:'50%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationTextGridArrayTextArea', 
         type:TextAreaWidget,
         title:'Edit selected array parameter',
                  listen:[{"event":"edit.adminPortalWidgetConfigurationTextGridArrayHorizontalTableHorizontalTable.finished","method":"refresh"}],
                                                                                                   width:'700',
                  skin:'textarea'}
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  {
  id:'adminPortalEventEditGrid', 
  type:GridWidget,
  visible:false,
  marginLeft:'30',
  marginRight:'30',
  marginTop:'50',
    width:'100%',
      widgets:[
                                                                                                                                                                                    
        {
        id:'adminPortalEventEditGridRow1', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventEditGridTitle1', 
         type:TextWidget,
         title:'Event Table',
                                                      marginBottom:'30',
                                    titleFontSize:24,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      {
      id:'adminPortalEventEditGridRow2', 
      type:GridRowWidget,
                                          width:'100%',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalEventEditGridCell2_1', 
       type:GridCellWidget,
                                                 width:'100%',
              skin:'cellwithtable',
              widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventEditHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["Event ID","Action Order","Action Name"],
        searchField:false,
        checkbox:false,
        visible:true,
        columnWidths:["60%","15%","10%"],
                        fadeOutNum:12,
        listen:[{"event":"choose.adminPortalEventCatalogUserGridApplicationDropBox.finished","method":"refreshWithWaitingForEvent","parameters":["rendered.adminPortalEventCatalogUserGridButton"]},{"event":"launch.adminPortalWidgetConfigurationAddEventGridButton.finished","method":"refresh"},{"event":"launch.adminPortalWidgetConfigurationDeleteWarnGridButton.finished","method":"refresh"}],
        isInBox:false,
                        width:'100%',
                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalEventEditHorizontalTableEdit', 
         type:ActionButtonRowWidget,
         action:'open',
         align:'right',
         position:1,
         icon:'icon-main-settings'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
         {
         id:'adminPortalEventEditHorizontalTableDelete', 
         type:ActionButtonRowWidget,
         action:'choose',
         align:'right',
         position:2,
         icon:'icon-trash'}
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
   {
   id:'adminPortalEventEditGridRow2_5', 
   type:GridRowWidget,
                                 widgets:[
                                                                                                                                                                                                                                                                        
    {
    id:'adminPortalEventEditGridCell2_2', 
    type:GridCellWidget,
                            width:'100%',
        skin:'cellwithtable',
        widgets:[
                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalEventEditGridCell2_2Grid', 
     type:GridWidget,
     visible:false,
                         width:'100%',
               widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      {
      id:'adminPortalEventEditGridCell2_2GridRow1', 
      type:GridRowWidget,
                                          width:'100%',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalEventEditGridCell2_2GridCell1', 
       type:GridCellWidget,
                                                 width:'100%',
              skin:'cellwithtable',
              widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventEditArgumentHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["Argument Name","Argument Value"],
        searchField:false,
        checkbox:false,
        visible:true,
                                        listen:[{"event":"open.adminPortalEventEditHorizontalTable.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"},{"event":"choose.adminPortalEventEditGridArgumentDropbox.finished","method":"refresh"}],
        isInBox:false,
                                                                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalEventEditArgumentHorizontalTableEdit', 
         type:ActionButtonRowWidget,
         action:'open',
         align:'right',
         position:1,
         icon:'icon-edit'}
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
       {
       id:'adminPortalEventEditGridCell2_2GridRow2', 
       type:GridRowWidget,
                            marginTop:'30',
                     width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventEditGridCell2_2GridCell2', 
        type:GridCellWidget,
                                                        width:'100%',
                skin:'cellwithtable',
                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventEditGridArgumentDropbox', 
         type:DropBoxWidget,
         title:'Edit Argument Value',
         titleVisible:true,
                                    listen:[{"event":"open.adminPortalEventEditArgumentHorizontalTable.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
         visible:false,
                                             width:'600',
                                                               skin:'analogicdropbox'}
]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalEventEditGridRow3', 
        type:GridRowWidget,
                                marginTop:'20',
                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventEditAddButton', 
         type:ButtonWidget,
         label:'',
                  action:'',
         visible:false,
         width:'50',
         icon:'icon-add-circle',
                                                                                          skin:'analogicaddbutton',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalEventEditGridRow4', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventEditGridTitle3', 
         type:TextWidget,
         title:'Listen Table',
                                             marginTop:'40',
         marginBottom:'30',
                                    titleFontSize:24,
                                                                        }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      {
      id:'adminPortalEventEditGridRow5', 
      type:GridRowWidget,
                                          width:'100%',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalEventEditGridCell5_1', 
       type:GridCellWidget,
                                                 width:'100%',
              skin:'cellwithtable',
              widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalEventListenHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["Event ID", "Event Name","Method","Parameter"],
        searchField:false,
        checkbox:false,
        visible:true,
        columnWidths:["10%","40%","14%","30%"],
                                listen:[{"event":"launch.analogicPortalEventEditTableAddButton.finished","method":"refreshWithState"},{"event":"delete.analogicPortalEventEditTable.finished","method":"refreshWithState"},{"event":"launch.analogicPortalEventEditNewAddButton.finished","method":"refreshWithState"},{"event":"bodyReady","method":"refreshWithState"},{"event":"launch.adminPortalWidgetConfigurationAddListenGridButton.finished","method":"refreshWithState"}, {"event":"launch.adminPortalWidgetConfigurationEditListenGridButton.finished","method":"refreshWithState"}, {"event":"launch.adminPortalWidgetConfigurationDeleteListenWarnGridButton.finished","method":"refreshWithState"}],
        isInBox:false,
                        width:'100%',
                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalEventListenHorizontalTableEdit', 
         type:ActionButtonRowWidget,
         action:'open',
         align:'right',
         position:1,
         icon:'icon-main-settings'} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
         {
         id:'adminPortalEventListenHorizontalTableDelete', 
         type:ActionButtonRowWidget,
         action:'choose',
         align:'right',
         position:2,
         icon:'icon-trash'}
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        {
        id:'adminPortalEventEditGridRow6', 
        type:GridRowWidget,
                                marginTop:'20',
        marginBottom:'100',
                width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalEventEditListenAddButton', 
         type:ButtonWidget,
         label:'',
                  action:'',
         visible:true,
         width:'50',
         icon:'icon-add-circle',
                                                                                          skin:'analogicaddbutton',
                                                               }
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalWidgetConfigurationAddEventContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'300',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
   skin:'scrollable',
   widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalWidgetConfigurationAddEventGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationAddEventGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddEventGridEvent', 
         type:DropBoxWidget,
         title:'Event',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridSourceApplication.finished","method":"refresh"}],
                                                      width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationAddEventGridRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddEventGridAction', 
         type:DropBoxWidget,
         title:'Action',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridSourceApplication.finished","method":"refresh"}],
                                    marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalWidgetConfigurationAddEventGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetConfigurationAddEventGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationAddEventGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationAddEventGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddEventGridButton', 
         type:ButtonWidget,
         label:'Add Event',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationAddEventGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddEventGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     {
     id:'adminPortalDataEditGrid', 
     type:GridWidget,
     visible:false,
     marginLeft:'30',
     marginRight:'30',
     marginTop:'50',
     marginBottom:'100',
     width:'100%',
               widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      {
      id:'adminPortalDataEditGridRow1', 
      type:GridRowWidget,
                                          width:'100%',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalDataEditGridCell1_1', 
       type:GridCellWidget,
                                                 width:'100%',
              skin:'cellwithtable',
              widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationDataEditHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["Widget ID","Parameter","Dataset"],
        searchField:false,
        checkbox:false,
        visible:true,
        columnWidths:["80%","10%","4%"],
                                listen:[{"event":"choose.DropBoxAppFilterDataRepository.finished","method":"refresh"}],
        isInBox:false,
                        width:'100%',
                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalWidgetConfigurationDataEditHorizontalTableChoose', 
         type:RadioButtonRowWidget,
         action:'choose',
         align:'left',
         position:1} ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDataEditHorizontalTableEdit', 
         type:ActionButtonRowWidget,
         action:'open',
         align:'right',
         position:1,
         icon:'icon-edit'}
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
       {
       id:'adminPortalDataEditGridRow2', 
       type:GridRowWidget,
                                                 width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalDataEditGridCell2_1', 
        type:GridCellWidget,
                                                        width:'100%',
                skin:'cellwithtable',
                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDataEditTextArea', 
         type:TextAreaWidget,
         title:'Generated in data repository',
                  listen:[{"event":"choose.adminPortalWidgetConfigurationDataEditHorizontalTable.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
                                                                        marginTop:'30',
                           width:'100%',
                  skin:'textarea'}
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      {
      id:'adminPortalDataEditGridRow3', 
      type:GridRowWidget,
                              marginBottom:'20',
            width:'100%',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalDataEditGridCell3_1', 
       type:GridCellWidget,
                                                 width:'100%',
              skin:'cellwithtable',
              widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationMDXEditHorizontalTable', 
        type:HorizontalTableWidget,
        title:'',
        titleVisible:false,
        columnNames:["Event Type","Parameter","Value"],
        searchField:false,
        checkbox:false,
        visible:true,
        columnWidths:["7%","10%","80%"],
                                listen:[{"event":"open.adminPortalWidgetConfigurationDataEditHorizontalTable.finished","method":"refresh"},{"event":"edit.adminPortalWidgetConfigurationMDXEditHorizontalTable.finished","method":"refresh"},{"event":"save.adminPortalWidgetConfigurationMDXEditTextArea.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
        isInBox:false,
                        width:'100%',
                                marginTop:'30',
                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         {
         id:'adminPortalWidgetConfigurationMDXEditHorizontalTableChoose', 
         type:RadioButtonRowWidget,
         action:'choose',
         align:'left',
         position:1}
]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
       {
       id:'adminPortalDataEditGridRow4', 
       type:GridRowWidget,
                                   marginBottom:'130',
              width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalDataEditGridCell4_1', 
        type:GridCellWidget,
                                                        width:'100%',
                skin:'cellwithtable',
                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationMDXEditTextArea', 
         type:TextAreaWidget,
         title:'Edit Parameter Value:',
         margin:true,
         listen:[{"event":"choose.adminPortalWidgetConfigurationMDXEditHorizontalTable.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"},{"event":"open.adminPortalWidgetConfigurationDataEditHorizontalTable.finished","method":"refresh"}],
                           titleVisible:true,
         height:'20',
                                             marginBottom:'100',
         visible:false,
         width:'100%',
                  skin:'textarea'}
]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
         {
         id:'adminPortalDataEditGridRow5', 
         type:GridRowWidget,
                                             marginBottom:'100',
                  width:'100%',
                                    widgets:[]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
   {
   id:'adminPortalWidgetConfigurationCopyContentContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'300',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
   skin:'scrollable',
   widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalWidgetConfigurationCopyContentGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationCopyContentGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationCopyContentGridEvent', 
         type:DropBoxWidget,
         title:'Source Widget',
         titleVisible:true,
         multiSelect:true,
                           listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridSourceApplication.finished","method":"refresh"}],
                                                      width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationCopyContentGridRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationCopyContentGridAction', 
         type:DropBoxWidget,
         title:'Content',
         titleVisible:true,
         multiSelect:true,
                  items:[{"name":"widget-config"},{"name":"event-map"},{"name":"data repository"}],
         listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridSourceApplication.finished","method":"refresh"}],
                                    marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'multiselect'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalWidgetConfigurationCopyContentGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetConfigurationCopyContentGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationCopyContentGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationCopyContentGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationCopyContentGridButton', 
         type:ButtonWidget,
         label:'Copy Content',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationCopyContentGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationCopyContentGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalApplicationsDeployWarnContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'200',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
      widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalApplicationsDeployWarnGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsDeployWarnGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeployWarnText', 
         type:TextWidget,
         title:'Admin Portal',
         body:'Are you sure you want to deploy the selected application?',
                                                                                                                                                         }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalApplicationsDeployWarnGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalApplicationsDeployWarnGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalApplicationsDeployWarnGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalApplicationsDeployWarnGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeployWarnGridButton', 
         type:ButtonWidget,
         label:'Deploy',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalApplicationsDeployWarnGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalApplicationsDeployWarnGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalWidgetConfigurationDeleteWarnContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'200',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
      widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalWidgetConfigurationDeleteWarnGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationDeleteWarnGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDeleteWarnText', 
         type:TextWidget,
         title:'Admin Portal',
         body:'Are you sure you want to delete the selected event?',
                                                                                                                                                         }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalWidgetConfigurationDeleteWarnGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetConfigurationDeleteWarnGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationDeleteWarnGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationDeleteWarnGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDeleteWarnGridButton', 
         type:ButtonWidget,
         label:'Delete',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationDeleteWarnGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDeleteWarnGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalWidgetConfigurationAddListenContainer', 
   type:ContainerWidget,
            visible:false,
   width:'600',
   bgScrollable:true,
                        height:'500',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
   skin:'scrollable',
   widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalWidgetConfigurationAddListenGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationAddListenGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddListenGridEvent', 
         type:DropBoxWidget,
         title:'Event Name',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"launch.adminPortalEventEditListenAddButton.finished","method":"refresh"}],
                                                      width:'540',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationAddListenGridRow2_5', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddListenGridNonExist', 
         type:TextBoxWidget,
         title:'Non Existing Event Name',
                                                                        marginTop:'20',
                  width:'540',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        {
        id:'adminPortalWidgetConfigurationAddListenGridRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddListenGridAction', 
         type:DropBoxWidget,
         title:'Method',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"choose.adminPortalWidgetCatalogAddNewGridSourceApplication.finished","method":"refresh"}],
                                    marginTop:'20',
                  width:'540',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationAddListenGridRow4', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddListenGridParameter', 
         type:TextBoxWidget,
         title:'Parameter',
                                                                        marginTop:'20',
                  width:'540',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
     {
     id:'adminPortalWidgetConfigurationAddListenGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetConfigurationAddListenGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationAddListenGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationAddListenGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddListenGridButton', 
         type:ButtonWidget,
         label:'Add',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationAddListenGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationAddListenGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalWidgetConfigurationEditListenContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'400',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
   skin:'scrollable',
   widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalWidgetConfigurationEditListenGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationEditListenGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationEditListenGridEvent', 
         type:DropBoxWidget,
         title:'Event Name',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"open.adminPortalEventListenHorizontalTable.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
                                                      width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationEditListenGridRow3', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationEditListenGridAction', 
         type:DropBoxWidget,
         title:'Method',
         titleVisible:true,
         multiSelect:false,
                           listen:[{"event":"open.adminPortalEventListenHorizontalTable.finished","method":"refresh"},{"event":"bodyReady","method":"refresh"}],
                                    marginTop:'20',
                  width:'340',
                  titleFontSize:14,
         titleFontColor:'#007aff',
                                    skin:'analogicdropbox'}
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        {
        id:'adminPortalWidgetConfigurationEditListenGridRow4', 
        type:GridRowWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationEditListenGridParameter', 
         type:TextBoxWidget,
         title:'Parameter',
                                                                        marginTop:'20',
                  width:'340',
         skin:'analogic',
                                                                                 }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
     {
     id:'adminPortalWidgetConfigurationEditListenGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetConfigurationEditListenGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationEditListenGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationEditListenGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationEditListenGridButton', 
         type:ButtonWidget,
         label:'Update',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationEditListenGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationEditListenGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   {
   id:'adminPortalWidgetConfigurationDeleteListenWarnContainer', 
   type:ContainerWidget,
            visible:false,
   width:'400',
   bgScrollable:true,
                        height:'200',
   behaviour:'popup',
   pinned:false,
         bgColor:'#ffffff',
      widgets:[
                                                                                                                                                                                                                                          
    {
    id:'adminPortalWidgetConfigurationDeleteListenWarnGrid', 
    type:GridWidget,
    visible:true,
    marginLeft:'20',
    marginRight:'20',
    marginTop:'20',
                    widgets:[
                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationDeleteListenWarnGridRow2', 
        type:GridRowWidget,
                                                        width:'100%',
                                widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDeleteListenWarnText', 
         type:TextWidget,
         title:'Admin Portal',
         body:'Are you sure you want to delete the selected listen?',
                                                                                                                                                         }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     {
     id:'adminPortalWidgetConfigurationDeleteListenWarnGridRow5', 
     type:GridRowWidget,
                                                       widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      {
      id:'adminPortalWidgetConfigurationDeleteListenWarnGridButtonGrid', 
      type:GridWidget,
            marginLeft:'20',
      marginRight:'20',
                  width:'100%',
                  widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
       {
       id:'adminPortalWidgetConfigurationDeleteListenWarnGridButtonGridRow1', 
       type:GridRowWidget,
                                          alignment:'center',
       width:'100%',
                            widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
        id:'adminPortalWidgetConfigurationDeleteListenWarnGridButtonGridCell1', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDeleteListenWarnGridButton', 
         type:ButtonWidget,
         label:'Delete',
                  action:'',
                  width:'100',
                                             marginTop:'40',
                                    fontColor:'icon-add-circle',
                  skin:'analogicpopup',
                                                               }
]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
        id:'adminPortalWidgetConfigurationDeleteListenWarnGridButtonGridCell2', 
        type:GridCellWidget,
                                                                                        widgets:[
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         {
         id:'adminPortalWidgetConfigurationDeleteListenWarnGridCancelButton', 
         type:ButtonWidget,
         label:'Cancel',
                  action:'',
                  width:'100',
                           marginLeft:'10',
                  marginTop:'40',
                                                      skin:'analogiccancel',
                                                               }
]}]}]}]}]}]}]},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
};
