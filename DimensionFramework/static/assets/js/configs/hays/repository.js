/* global app, Utils*/

'use strict';

app.repository = {
    haysKamForecastingGridTable: {
        init: {
            execute: (db) => {
                let result = [
                    [
                        {
                            title: 'Businesspartner',
                            icon: 'icon-person',
                            iconColor: '#6F42C1',
                            skin: 'filter_button',
                            cellSkin: 'top_greyfon'
                        },
                        {
                            title: 'Type',
                            icon: 'icon-circle-grid-4',
                            skin: 'filter_button',
                            iconColor: '#28A745',
                            cellSkin: 'greyfon'
                        },
                        {
                            title: 'Account',
                            icon: 'icon-rectangle-stack-fill',
                            skin: 'filter_button',
                            iconColor: '#E98300',
                            cellSkin: 'top_greyfon'
                        },
                        {
                            title: 'Location',
                            icon: 'icon-location',
                            skin: 'filter_button',
                            iconColor: '#E83E8C',
                            cellSkin: 'top_greyfon'
                        },
                        {
                            title: 'Project status',
                            icon: 'icon-calendar',
                            skin: 'filter_button',
                            iconColor: '#007BFF',
                            cellSkin: 'top_greyfon'
                        }
                    ],
                    [
                        {
                            title: 'valami',
                            skin: 'filter_text',
                            icon: 'icon-x-circle',
                            iconColor: '#A9A9A9',
                            cellSkin: 'bottom_greyfon'
                        },
                        {
                            title: '',
                            skin: 'filter_text',
                            icon: '',
                            iconColor: '#A9A9A9',
                            cellSkin: ''
                        },
                        {
                            title: 'valami',
                            skin: 'filter_text',
                            icon: 'icon-x-circle',
                            iconColor: '#A9A9A9',
                            cellSkin: 'bottom_greyfon'
                        },
                        {
                            title: 'valami',
                            skin: 'filter_text',
                            icon: 'icon-x-circle',
                            iconColor: '#A9A9A9',
                            cellSkin: 'bottom_greyfon'
                        },
                        {
                            title: 'valami',
                            skin: 'filter_text',
                            icon: 'icon-x-circle',
                            iconColor: '#A9A9A9',
                            cellSkin: 'bottom_greyfon'
                        }
                    ]
                ];
                return result;
            }

        }
    }

};