<?php

namespace App\Http\Controllers\api\menu;

use App\Http\Controllers\Controller;
use App\models\master\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use stdClass;

class MenuController extends Controller
{
    public function generateMenuWeb()
    {
        // $user_id = session('user_id');
        $user_id = Session::get('user_id');
        $sql = "select * from ( select distinct am.id,am.nama, am.icon, am.menu_alias, am.menu_url, am.menu_parent, am.sort, pu.insert, pu.update, pu.delete, pu.view, pu.approve, pu.print from app_menu am left join priviledges_user pu on pu.id_menu = am.id left join user_group ug on ug.id = pu.id_group_user left join users u on u.hak_akses = ug.id where u.id='" . $user_id . "' and pu.deleted is null) a
        order by a.menu_parent asc,a.sort";
        $dataMenu = DB::select(DB::raw($sql));
        $dataFix = (object)$dataMenu;
        return $this->buildMenu($dataFix);
    }


    function my_array_unique($array, $keep_key_assoc = false)
    {
        $duplicate_keys = array();
        $tmp = array();

        foreach ($array as $key => $val) {
            // convert objects to arrays, in_array() does not support objects
            if (is_object($val))
                $val = (array)$val;

            if (!in_array($val, $tmp))
                $tmp[] = $val;
            else
                $duplicate_keys[] = $key;
        }

        foreach ($duplicate_keys as $key)
            unset($array[$key]);

        return $keep_key_assoc ? $array : array_values($array);
    }

    public function hasChild($rows, $id)
    {
        foreach ($rows as $key => $row) {
            if ($row->menu_parent == $id)
                return true;
        }
        return false;
    }
    public function buildMenu($rows, $parent = 0)
    {
        $result = "";
        foreach ($rows as $key => $row) {
            if ($row->menu_parent == $parent) {
                $url = trim($row->menu_url) == '' ? '' : URL::to($row->menu_url);
                $url_has_index = $row->menu_url . '/index';
                $url_has_add = $row->menu_url . '/add';
                $url_has_ubah = $row->menu_url . '/edit';
                $menu_togle = trim($row->menu_url) == '' ? 'menu-toggle' : '';
                $menu_active = request()->is($row->menu_url) || request()->is($url_has_index) || request()->is($url_has_add) || request()->is($url_has_ubah) ? 'active' : '';
                // $result.= "<li>".$row->nama;
                $result .= "<li data_id='" . $row->id . "' id='left-menu-" . $row->id . "' parent_menu='" . $row->menu_parent . "' class='menu-item parent-menu-" . $row->menu_parent . " " . $menu_active . "' >
                <a  href='" . $url . "' class='menu-link " . $menu_togle . "'>
                    <i class='" . $row->icon . "'></i>
                    <div data-i18n='" . $row->nama . "'>" . $row->nama . "</div>
                </a>
                ";
                $result .= "
                        <ul class='menu-sub'>
                    ";
                if ($this->hasChild($rows, $row->id)) {
                    $result .= $this->buildMenu($rows, $row->id);
                }
                $result .= "</ul>";
                $result .= "</li>";
            }
        }
        return $result;
    }
}
