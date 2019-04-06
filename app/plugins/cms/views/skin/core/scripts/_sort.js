/***************************************************
Description: Sort algorithms
****************************************************/
class Sort {
    bubbleSort(arr) {
        if (arr.length <= 1) return arr;
        var alen = arr.length;
        for (var i = 0; i < alen; i++) {
            for (var j = 0; j < alen - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }

    quickSort(arr) {
        if (arr.length <= 1) return arr;
        var pivot = Math.floor((arr.length - 1) / 2),
            pivotValue = arr[pivot],
            left = [],
            right = [];
        arr = arr.slice(0, pivot).concat(arr.slice(pivot + 1));
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < pivotValue) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return [].concat(quickSort(left), [pivotValue], quickSort(right));
    }

    mergeSort(arr) {
        if (arr.length <= 1) return arr;
        var mid = Math.floor(arr.length / 2),
            left = arr.slice(0, mid),
            right = arr.slice(mid);

        var merge = function merge(left, right) {
            var result = [];
            while (left.length && right.length) {
                if (left[0] < right[0]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }
            return result.concat(left).concat(right);
        };
        return merge(mergeSort(left), mergeSort(right));
    }

    selectionSort(arr) {
        for (var i = 0; i < arr.length; i++) {
            var min = i;
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            if (min != i) {
                var temp = arr[min];
                arr[min] = arr[i];
                arr[i] = temp;
            }
        }
        return arr;
    }

    insertionSort(arr) {
        for (var i = 0; i < arr.length; i++) {
            var j = i - 1,
                temp = arr[i];
            while (j >= 0 && arr[j] > temp) {
                arr[j + 1] = arr[j];
                arr[j] = temp;
                j--;
            }
        }
        return arr;
    }
};
window.Sort = Sort
export default Sort;