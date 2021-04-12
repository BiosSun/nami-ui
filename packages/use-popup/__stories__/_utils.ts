import { Placement } from '@popperjs/core'

export const POPPER_PLACEMENTS_MAP: { [key: string]: Placement } = {
    'left top | left top': 'bottom-start',
    'left top | left center': 'bottom-start',
    'left top | left bottom': 'bottom-start',
    'left top | center top': 'bottom',
    'left top | center center': 'bottom',
    'left top | center bottom': 'bottom',
    'left top | right top': 'right-start',
    'left top | right center': 'right',
    'left top | right bottom': 'right-end',

    'left center | left top': 'top-start',
    'left center | left center': 'top-start',
    'left center | left bottom': 'top-start',
    'left center | center top': 'top',
    'left center | center center': 'top',
    'left center | center bottom': 'top',
    'left center | right top': 'right-end',
    'left center | right center': 'right',
    'left center | right bottom': 'right-start',

    'left bottom | left top': 'top-start',
    'left bottom | left center': 'top-start',
    'left bottom | left bottom': 'top-start',
    'left bottom | center top': 'top',
    'left bottom | center center': 'top',
    'left bottom | center bottom': 'top',
    'left bottom | right top': 'right-start',
    'left bottom | right center': 'right',
    'left bottom | right bottom': 'right-end',

    'center top | left top': 'bottom-end',
    'center top | left center': 'bottom-end',
    'center top | left bottom': 'bottom-end',
    'center top | center top': 'bottom',
    'center top | center center': 'bottom',
    'center top | center bottom': 'bottom',
    'center top | right top': 'bottom-start',
    'center top | right center': 'bottom-start',
    'center top | right bottom': 'bottom-start',

    'center center | left top': 'left-end',
    'center center | left center': 'left',
    'center center | left bottom': 'left-start',
    'center center | center top': 'top',
    'center center | center center': 'bottom',
    'center center | center bottom': 'bottom',
    'center center | right top': 'right-end',
    'center center | right center': 'right',
    'center center | right bottom': 'right-start',

    'center bottom | left top': 'top-end',
    'center bottom | left center': 'top-end',
    'center bottom | left bottom': 'top-end',
    'center bottom | center top': 'top',
    'center bottom | center center': 'top',
    'center bottom | center bottom': 'top',
    'center bottom | right top': 'top-start',
    'center bottom | right center': 'top-start',
    'center bottom | right bottom': 'top-start',

    'right top | left top': 'right-start',
    'right top | left center': 'right-start',
    'right top | left bottom': 'right-start',
    'right top | center top': 'right-start',
    'right top | center center': 'right-start',
    'right top | center bottom': 'right-start',
    'right top | right top': 'bottom-end',
    'right top | right center': 'bottom-end',
    'right top | right bottom': 'bottom-end',

    'right center | left top': 'right-end',
    'right center | left center': 'right',
    'right center | left bottom': 'right-start',
    'right center | center top': 'right-end',
    'right center | center center': 'right',
    'right center | center bottom': 'right-start',
    'right center | right top': 'right-end',
    'right center | right center': 'right',
    'right center | right bottom': 'right-start',

    'right bottom | left top': 'right-end',
    'right bottom | left center': 'right-end',
    'right bottom | left bottom': 'right-end',
    'right bottom | center top': 'top-end',
    'right bottom | center center': 'top-end',
    'right bottom | center bottom': 'top-end',
    'right bottom | right top': 'top-end',
    'right bottom | right center': 'top-end',
    'right bottom | right bottom': 'top-end',
}