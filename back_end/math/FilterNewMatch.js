


if (read) {
    for (let i = filter.length - 1; i >= 0; i -= 1) {
      for (let j = 0; j < read.length; j += 1) {
        if (filter[i] === read[j].match_id) {
          filter.splice(i, 1);
        }
      }
    }
  }