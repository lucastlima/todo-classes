class TodoDOM {
  static clean(ref) {
    const el = document.querySelector(ref);
    el.innerHTML = "";
  }
}

export default TodoDOM;
